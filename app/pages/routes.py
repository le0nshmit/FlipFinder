from flask import render_template, jsonify
from ..auth import get_access_token
from ..ebay_api import search_items
from ..utils import get_data

def create_routes(page_bp, page_api):

    '''=== PAGES ==='''
    @page_bp.route('/')
    def home():
        return render_template('home.html')

    @page_bp.route('/search')
    def search():
        return render_template('search.html', page='search')

    
    '''=== APIs ==='''
    @page_api.route('/api/search', methods=['POST'])
    def search():
        data = get_data()
        token = get_access_token()
        filters = data.get('filters') if data else None
        items = search_items(data['search'], token, filters=filters)

        return jsonify({'success': True, 'data': items.get('itemSummaries')})
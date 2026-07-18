from flask import request, current_app, session, redirect, jsonify, render_template
from itsdangerous import URLSafeSerializer
import werkzeug

def get_data():
    '''This will retrieve data from form'''

    try:
        data = request.get_json()
        return data
    except werkzeug.exceptions.BadRequest as error:
        return None


def get_serializer():
    return URLSafeSerializer(current_app.config['SECRET_KEY'])


def get_session(url, html):
    if 'id' in session:
        return redirect(url)
    else:
        return render_template(f'{html}.html')
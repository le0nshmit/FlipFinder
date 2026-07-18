from warnings import filters

import requests
from .config import BASE_URL

def search_items(query, token, filters=None):
    url = f"{BASE_URL}/buy/browse/v1/item_summary/search"

    headers = {
        "Authorization": f"Bearer {token}"
    }

    params = {'q': query}

    if filters:
        if 'price' in filters:
            price = filters.get('price')
            params['filter'] = f"price:[{price['min']}..{price['max']}],priceCurrency:GBP"

    results = requests.get(url, headers=headers, params=params)

    return results.json()



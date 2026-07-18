import requests
from .config import BASE_URL

def search_items(query, token, filters=None):
    """Search eBay Buy API for items.

    filters: dict with optional keys, e.g. {
        'price': {'min': '10', 'max': '100'},
        'conditions': ['NEW','USED']
    }
    Note: adapt mapping to official eBay API filter syntax as needed.
    """
    url = f"{BASE_URL}/buy/browse/v1/item_summary/search"

    headers = {
        "Authorization": f"Bearer {token}"
    }

    params = {'q': query}

    # Example: map price and condition filters into eBay "filter" expressions
    filter_expressions = []
    if filters:
        price = filters.get('price')
        if price:
            pmin = price.get('min')
            pmax = price.get('max')
            if pmin or pmax:
                # eBay expects ranges like price:[min..max]
                min_val = pmin if pmin else '*'
                max_val = pmax if pmax else '*'
                filter_expressions.append(f"price:[{min_val}..{max_val}]")

        conditions = filters.get('conditions')
        if conditions:
            # join multiple conditions with OR; actual API syntax may differ
            cond_expr = ' OR '.join([f"condition:{c}" for c in conditions])
            filter_expressions.append(f"({cond_expr})")

    if filter_expressions:
        params['filter'] = ','.join(filter_expressions)

    results = requests.get(url, headers=headers, params=params)

    return results.json()



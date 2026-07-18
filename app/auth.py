import requests
import base64
from .config import CLIENT_ID, CLIENT_SECRET, BASE_URL

def get_access_token():
    credentials = f"{CLIENT_ID}:{CLIENT_SECRET}"
    encoded = base64.b64encode(credentials.encode()).decode()

    url = f"{BASE_URL}/identity/v1/oauth2/token"

    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": f"Basic {encoded}"
    }

    data = {
        "grant_type": "client_credentials",
        "scope": f"{BASE_URL}/oauth/api_scope"
    }

    res = requests.post(url, headers=headers, data=data)
    return res.json()["access_token"]
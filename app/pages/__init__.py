from flask import Blueprint

page_bp = Blueprint('page_bp', __name__, template_folder='templates')
page_api = Blueprint('page_api', __name__)

from .routes import create_routes

create_routes(page_bp, page_api)
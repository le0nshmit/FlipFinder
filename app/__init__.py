from flask import Flask
from dotenv import load_dotenv
import os

def create_app():
    app = Flask(__name__)

    load_dotenv()

    from .pages import page_bp, page_api


    app.register_blueprint(page_bp)
    app.register_blueprint(page_api)


    return app
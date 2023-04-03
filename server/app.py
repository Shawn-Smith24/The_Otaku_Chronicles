from flask import Flask, make_response, request, abort, jsonify, session
from flask_migrate import Migrate
from flask_cors import CORS
from flask_restful import Api, Resource
from models import db, User, Post, Comment, Like
from werkzeug.exceptions import NotFound, Unauthorized
from flask_bcrypt import Bcrypt



app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
bcrypt = Bcrypt(app)

app.secret_key = b'@~xH\xf2\x10k\x07hp\x85\xa6N\xde\xd4\xcd'

CORS(app)
migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)

# Views go here!

if __name__ == '__main__':
    app.run(port=5555, debug=True)

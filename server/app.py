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

class index(Resource):
    def get(self):
        return {'message': 'Welcome to Goal Oriented!'}


class Users(Resource):
    def get(self):

        users = User.query.all()
        users_dict = [user.to_dict() for user in users]

        response = make_response(
            jsonify(users_dict),
            200,
        )

        return response
    
    def post(self):
        data = request.get_json()
        new_user = User(
            first_name=data['first_name'],
            last_name=data['last_name'],
            user_name=data['user_name'],
            email=data['email'],
            password=data['password'],
        )
        db.session.add(new_user)
        db.session.commit()
        return new_user.to_dict()


class UsersByID(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        
        if not user:
            abort(404, 'User not found')
            
        user_dict = user.to_dict()
        
        response = make_response(
            jsonify(user_dict),
            200
        )
        return response
#API Routes
api.add_resource(UsersByID, '/users/<int:id>')
api.add_resource(Users, '/users')
api.add_resource(index, '/')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

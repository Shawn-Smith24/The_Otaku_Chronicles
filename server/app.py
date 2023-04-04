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

class Home(Resource):
    def get(self):
        return {'message': 'Welcome to Goal Oriented Social Media!'}
    
    
class Users(Resource):

    def get(self):

        users = User.query.all()
        users_dict = [user.to_dict() for user in users]

        response = make_response(
            jsonify(users_dict),
            200,
        )

        return response
    
class UsersByID(Resource):
    pass

class Posts(Resource):
    def get(self):
        posts = Post.query.all()
        posts_dict = [post.to_dict() for post in posts]

        response = make_response(
            jsonify(posts_dict),
            200,
        )

        return response

class PostsByID(Resource):
    pass

class Comments(Resource):
    def get(self):
        comments = Comment.query.all()
        comments_dict = [comment.to_dict() for comment in comments]

        response = make_response(
            jsonify(comments_dict),
            200,
        )

        return response

class CommentsByID(Resource):
    pass

class Likes(Resource):
    def get(self):
        likes = Like.query.all()
        likes_dict = [like.to_dict() for like in likes]

        response = make_response(
            jsonify(likes_dict),
            200,
        )

        return response

class LikesByID(Resource):
    pass

    
#signup route
class Signup(Resource):
    def post(self):
        form_json = request.get_json()
        print(form_json)
        new_user = User(first_name=form_json['first_name'], last_name=form_json['last_name'], user_name= form_json['user_name'], email=form_json['email'])
        new_user.password = form_json['password']  # Use the password setter property
        db.session.add(new_user)
        db.session.commit()
        response = make_response(
            new_user.to_dict(),
            201
        )
        return response

#login route
class Login(Resource):
    def post(self):
        try:
            user = User.query.filter_by(email=request.get_json()['email']).first()
            if user == None: 
                return make_response("this email does not exist", 404)
            print(user.authenticate(request.get_json()['password']))
            if user and user.authenticate(request.get_json()['password']):
                session['user_id'] = user.id
                response = make_response(
                    user.to_dict(),
                    200
            ) 
            else: 
                response = make_response("incorrect password",404)
            return response
        except:
            abort(401, "Incorrect Email or Password")

#logout route
class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        response = make_response('', 204)
        return response


    
  
#Routes for Resources
api.add_resource(Logout, '/logout')
api.add_resource(Login, '/login')
api.add_resource(Signup, '/signup')
api.add_resource(LikesByID, '/likes/<int:id>')
api.add_resource(Likes, '/likes')
api.add_resource(CommentsByID, '/comments/<int:id>')
api.add_resource(Comments, '/comments')
api.add_resource(PostsByID, '/posts/<int:id>')
api.add_resource(Posts, '/posts')
api.add_resource(UsersByID, '/users/<int:id>')   
api.add_resource(Users, '/users')  
api.add_resource(Home, '/home')


@app.errorhandler(NotFound)
def handle_not_found(e):
    response = make_response(
        "Not Found: Sorry the resource you are looking for does not exist",
        404
    )

    return response
if __name__ == '__main__':
    app.run(port=5555, debug=True)

from flask import Flask, make_response, request, abort, jsonify, session
from flask_migrate import Migrate
from flask_cors import CORS
from flask_restful import Api, Resource
from models import db, User, Post, Comment, Like
from werkzeug.exceptions import NotFound, Unauthorized
from flask_bcrypt import Bcrypt
import requests



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
    
    def patch(self, id):
        user = User.query.filter_by(id=id).first()
        
        if not user:
            abort(404, 'User not found')
            
        data = request.get_json()
        for key in data:
            setattr(user, key, data[key])
            
        db.session.add(user)
        db.session.commit()
        
        response = make_response(
            user.to_dict(),
            200,
        )
        
        return response
    
    def delete(self, id):
        user = User.query.filter_by(id=id).first()
        
        if not user:
            abort(404, 'User not found')
            
        db.session.delete(user)
        db.session.commit()
        
        response = make_response(
            '',
            204,
        )
        
        return response

class Posts(Resource):
    def get(self):
        posts = Post.query.all()
        posts_dict = [post.to_dict() for post in posts]

        response = make_response(
            jsonify(posts_dict),
            200,
        )

        return response
    
    def post(self):
        data = request.get_json()
        new_post = Post(
            text=data['text'],
            author_id=data['author_id'],
        )
        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict()
    
    

class PostsByID(Resource):
    def get(self, id):
        post = Post.query.filter_by(id=id).first()
        
        if not post:
            abort(404, 'Post not found')
            
        post_dict = post.to_dict()
        
        response = make_response(
            jsonify(post_dict),
            200
        )
        return response
    
    def patch(self, id):
        post = Post.query.filter_by(id=id).first()
        
        if not post:
            abort(404, 'Post not found')
            
        data = request.get_json()
        for key in data:
            setattr(post, key, data[key])
            
        db.session.add(post)
        db.session.commit()
        
        response = make_response(
            post.to_dict(),
            200,
        )
        
        return response
    
    def delete(self, id):
        post = Post.query.filter_by(id=id).first()
        
        if not post:
            abort(404, 'Post not found')
            
        db.session.delete(post)
        db.session.commit()
        
        response = make_response(
            '',
            204,
        )
        
        return response

class Comments(Resource):
    def get(self):
        comments = Comment.query.all()
        comments_dict = [comment.to_dict() for comment in comments]

        response = make_response(
            jsonify(comments_dict),
            200,
        )

        return response
    
    def post(self):
        data = request.get_json()
        new_comment = Comment(
            text=data['text'],
            author_id=data['author_id'],
            post_id=data['post_id'],
        )
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()

class CommentsByID(Resource):
    def get(self,id):
        comment = Comment.query.filter_by(id=id).first()
        
        if not comment:
            abort(404, 'Comment not found')
            
        comment_dict = comment.to_dict()
        
        response = make_response(
            jsonify(comment_dict),
            200
        )
        return response

    def patch(self, id):
        comment = Comment.query.filter_by(id=id).first()
        
        if not comment:
            abort(404, 'Comment not found')
            
        data = request.get_json()
        for key in data:
            setattr(comment, key, data[key])
            
        db.session.add(comment)
        db.session.commit()
        
        response = make_response(
            comment.to_dict(),
            200,
        )
        
        return response
    
    def delete(self, id):
        comment = Comment.query.filter_by(id=id).first()
        
        if not comment:
            abort(404, 'Comment not found')
            
        db.session.delete(comment)
        db.session.commit()
        
        response = make_response(
            '',
            204,
        )
        
        return response
class Likes(Resource):
    def get(self):
        likes = Like.query.all()
        likes_dict = [like.to_dict() for like in likes]

        response = make_response(
            jsonify(likes_dict),
            200,
        )

        return response
    
    def post(self):
        data = request.get_json()
        new_like = Like(
            author_id=data['author_id'],
            post_id=data['post_id'],
        )
        db.session.add(new_like)
        db.session.commit()
        return new_like.to_dict()

class LikesByID(Resource):
    def get(self,id):
        like = Like.query.filter_by(id=id).first()
        
        if not like:
            abort(404, 'Like not found')
            
        like_dict = like.to_dict()
        
        response = make_response(
            jsonify(like_dict),
            200
        )
        return response
    
    
    def delete(self, id):
        like = Like.query.filter_by(id=id).first()
        
        if not like:
            abort(404, 'Like not found')
            
        db.session.delete(like)
        db.session.commit()
        
        response = make_response(
            '',
            204,
        )
        
        return response

    
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


class AuthorizedSession(Resource):
    def get(self):
        try:
            user = User.query.filter_by(id=session['user_id']).first()
            response = make_response(
                user.to_dict(),
                200
            )
            return response
        except:
            abort(401, "Unauthorized")
#logout route
class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        response = make_response('', 204)
        return response


    
  
#Routes for Resources
api.add_resource(AuthorizedSession, '/authorized')
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






##Anime API

url = 'https://anime-db.p.rapidapi.com/anime'

querystring= {'page': '1', 'size': '50', 'search' : '', 'genre': '', 'sortBy': 'title or ranking', 'sortOrder': 'asc or desc' }

headers = {
    "X-RapidAPI-Key": "bbea158bcamsh248f6e9aab2d052p1b7f5fjsne6b8ab07a484",
	"X-RapidAPI-Host": "anime-db.p.rapidapi.com"
}

response = requests.request("GET", url, headers=headers, params=querystring)

print("Anime API is working!")


@app.errorhandler(NotFound)
def handle_not_found(e):
    response = make_response(
        "Not Found: Sorry the resource you are looking for does not exist",
        404
    )

    return response
if __name__ == '__main__':
    app.run(port=5550, debug=True)

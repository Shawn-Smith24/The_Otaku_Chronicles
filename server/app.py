from flask import Flask, make_response, request, abort, jsonify, session, url_for, redirect, flash
from flask_migrate import Migrate
from flask_cors import CORS
from flask_restful import Api, Resource
from models import db, User, Post, Comment, Like, Anime
from werkzeug.exceptions import NotFound, Unauthorized
from flask_bcrypt import Bcrypt
import requests
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from flask_wtf import FlaskForm
from werkzeug.security import generate_password_hash, check_password_hash



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
            password_hash=data['password_hash'],
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
            subject=data['subject'],
            text=data['text'],
            username=data['username'],
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
            username=data['username'],
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
            username=data['username'],
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

class Animes(Resource):
    def get(self):
        animes = Anime.query.all()
        anime_dict = [anime.to_dict() for anime in animes]

        response = make_response(
            jsonify(anime_dict),
            200,
        )

        return response
    
    def post(self):
        data = request.get_json()
        new_anime = Anime(
            title=data['title'],
            description=data['description'],
            image_url=data['image_url'],
            genre=data['genre']
        )
        db.session.add(new_anime)
        db.session.commit()
        return new_anime.to_dict()
    
    
class AnimesByID(Resource):
    def get(self,id):
        anime = Anime.query.filter_by(id=id).first()
        
        if not anime:
            abort(404, 'Anime not found')
            
        anime_dict = anime.to_dict()
        
        response = make_response(
            jsonify(anime_dict),
            200
        )
        return response
    
    def patch(self, id):
        anime = Anime.query.filter_by(id=id).first()
        
        if not anime:
            abort(404, 'Anime not found')
            
        data = request.get_json()
        for key in data:
            setattr(anime, key, data[key])
            
        db.session.add(anime)
        db.session.commit()
        
        response = make_response(
            anime.to_dict(),
            200,
        )
        
        return response
    
    def delete(self, id):
        anime = Anime.query.filter_by(id=id).first()
        
        if not anime:
            abort(404, 'Anime not found')
            
        db.session.delete(anime)
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
        new_user = User(first_name=form_json['first_name'], last_name=form_json['last_name'], user_name= form_json['user_name'], email=form_json['email'], password_hash=form_json['password_hash'])
        new_user.password_hash = form_json['password_hash']  # Use the password_hash setter property
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
        email = request.json.get('email')
        password_hash = request.json.get('password_hash')
        
        user = User.query.filter_by(email=email).first()
        if user:
            if check_password_hash(user.password_hash, password_hash):
                flash("Logged in successfully", category="success")
                login_user(user, remember=True)
                return redirect(url_for('anime'))
            else:
                flash("Incorrect password", category="error")
        else:
            flash("User not found", category="error")
        
        return redirect(url_for('anime'))
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
api.add_resource(AuthorizedSession, '/authorized', endpoint='authorized')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(AnimesByID, '/anime/<int:id>', endpoint='animeID')
api.add_resource(Animes, '/anime', endpoint='anime')
api.add_resource(LikesByID, '/likes/<int:id>')
api.add_resource(Likes, '/likes', endpoint='likes')
api.add_resource(CommentsByID, '/comments/<int:id>', endpoint='comment')
api.add_resource(Comments, '/comments', endpoint='comments')
api.add_resource(PostsByID, '/posts/<int:id>', endpoint='post')
api.add_resource(Posts, '/posts', endpoint='posts')
api.add_resource(UsersByID, '/users/<int:id>', endpoint='usersId')   
api.add_resource(Users, '/users/', endpoint='users')  




@app.errorhandler(NotFound)
def handle_not_found(e):
    response = make_response(
        "Not Found: Sorry the resource you are looking for does not exist",
        404
    )

    return response
if __name__ == '__main__':
    app.run(port=5555, debug=True)

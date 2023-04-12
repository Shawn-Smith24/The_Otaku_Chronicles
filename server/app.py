from flask import Flask, make_response, request, abort, jsonify, session, url_for, redirect, flash, render_template
from flask_migrate import Migrate
from flask_cors import CORS
from flask_restful import Api, Resource
from models import db, User, Post, Anime, Manga, Character
from werkzeug.exceptions import NotFound, Unauthorized
import requests






app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False


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

class Mangas(Resource):
    def get(self):
        mangas = Manga.query.all()
        manga_dict = [manga.to_dict() for manga in mangas]

        response = make_response(
            jsonify(manga_dict),
            200,
        )

        return response
    
    def post(self):
        data = request.get_json()
        new_manga = Manga(
            title=data['title'],
            description=data['description'],
            image_url=data['image_url'],
            genre=data['genre']
        )
        db.session.add(new_manga)
        db.session.commit()
        return new_manga.to_dict()

class Characters(Resource):
    def get(self):
        characters = Character.query.all()
        character_dict = [character.to_dict() for character in characters]

        response = make_response(
            jsonify(character_dict),
            200,
        )

        return response
    
    def post(self):
        data = request.get_json()
        new_character = Character(
            name=data['name'],
            image_url=data['image_url'],
            bio = data['bio'],
            tier=data['tier'],
            power=data['power'],
        )
        db.session.add(new_character)
        db.session.commit()
        return new_character.to_dict()

@app.route('/signup', methods=['POST'])
def signup():
    
    
    username = request.get_json().get('username')
    password = request.get_json().get('password')
    confirm_password = request.get_json().get('confirmPassword')

    if username and password and confirm_password:
        if password == confirm_password:
            # Create a new User instance with the retrieved values
            new_user = User(username=username)
            new_user.password_hash = password

            db.session.add(new_user)
            db.session.commit()

            session['user_id'] = new_user.id
            return new_user.to_dict(), 201
        return {'message': 'Passwords do not match'}, 422
    return {'message': 'Username, password, and confirm password are required'}, 422

# /login
@app.route('/login', methods=['POST'])
def login():
    username = request.get_json()['username']
    password = request.get_json()['password']

    user = User.query.filter_by(username=username).first()
    if user:
        if user.authenticate(password):
            session['user_id'] = user.id
            return user.to_dict(), 200
    return {'message': '401: Unauthorized'}, 401
    
# /check_session
@app.route('/check_session', methods=['GET'])
def check_session():
    if session.get('user_id'):
    # if session['user_id']:
        user = User.query.filter_by(id=session['user_id']).first()
        if user:
            return user.to_dict(), 200
    return {'message': '401: Unauthorized'}, 401

# /logout
@app.route('/logout', methods=['DELETE'])
def logout():
    if session.get('user_id'):
    # if session['user_id']:
        session['user_id'] = None
        return {'message': '204: No Content'}, 204
    return {'message': '401: Unauthorized'}, 401



    
  
#Routes for Resources
api.add_resource(Characters, '/characters', endpoint='character')
api.add_resource(Mangas, '/manga', endpoint='manga')
api.add_resource(AnimesByID, '/anime/<int:id>', endpoint='animeID')
api.add_resource(Animes, '/anime', endpoint='anime')
api.add_resource(PostsByID, '/posts/<int:id>')
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

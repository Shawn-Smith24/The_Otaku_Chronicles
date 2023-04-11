from sqlalchemy.ext.hybrid import hybrid_property
from config import db
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
import re 


from flask_bcrypt import Bcrypt
bcrypt = Bcrypt()

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

# Models go here!

class User(db.Model, SerializerMixin):
    serialize_only = ( 'username', 'posts')
    
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable= False, unique=True)
    _password_hash = db.Column(db.String(50), nullable=False)
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    posts = db.relationship('Post', backref='users')
    comments = db.relationship('Comment', backref='users')
    likes = db.relationship('Like', backref='users')
    anime = db.relationship('Anime', backref='users')

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be accessed')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf_8'))
        self._password_hash = password_hash.decode('utf-8')

    # authentication method using user and password
    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))    
        
    def __repr__ (self):
        return f'User: {self.username}'    
    
    
    @validates('user_name')
    def validate_user_name(self, key, user_name):
        if not user_name:
            raise AssertionError('No user_name provided')
     
        if not re.match("[a-zA-Z0-9]+", user_name):
            
            raise AssertionError('Provided user_name is not an user_name') 
      
        return user_name
    
    
class Post(db.Model, SerializerMixin):
    serialize_only = ('id', 'text', 'subject', 'username', 'comments', 'likes')
    
    __tablename__ = 'posts'
    
    id = db.Column(db.Integer, primary_key=True)
    subject = db.Column(db.String, default='Enter a description for your post')
    text = db.Column(db.String(500), nullable=False)
    username = db.Column(db.String(50) , db.ForeignKey('users.username'))
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
   
    comments = db.relationship('Comment', backref='posts')
    likes = db.relationship('Like', backref='posts')
    
    def __init__(self, subject, username, text):
        self.subject = subject
        self.username = username
        self.text = text

    def __repr__(self):
        return f'Post : {self.text}'
    
    @validates('text')
    def validate_text(self, key, text):
        if not text:
         raise AssertionError('No text provided')
     
        if not re.match("[a-zA-Z0-9]+", text):
            
          raise AssertionError('Provided text is not an text') 
      
        return text
    
    
class Like(db.Model, SerializerMixin):
    serialize_only = ('id', 'post_id', 'username', 'likes')
    
    __tablename__ = 'likes'
    
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    username = db.Column(db.String(50) , db.ForeignKey('users.username'))
    likes = db.Column(db.Integer, default=0)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
   
    
    def __repr__(self):
        return f'Like : {self.id}'


class Comment(db.Model, SerializerMixin):
    serialize_only = ('id', 'text', 'username', 'post_id')
    
    
    __tablename__ = 'comments'
    
    
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(500), nullable=False)
    username = db.Column(db.String(50) , db.ForeignKey('users.username'))

    
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    def __init__(self, text, username):
        self.username = username
        self.text = text

    @validates('text')
    def validate_text(self, key, text):
        if not text:
         raise AssertionError('No text provided')
     
        if not re.match("[a-zA-Z0-9]+", text):
            
          raise AssertionError('Provided text is not an text') 
      
        return text
    

    def __repr__(self):
        return f'Comment : {self.text}'
    
    
class Anime(db.Model, SerializerMixin):
    serialize_only = ('id', 'title', 'description', 'image_url', 'genre')
    
    __tablename__ = 'animes'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    image_url = db.Column(db.String(500), nullable=False)
    genre = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    
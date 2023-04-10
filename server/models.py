
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
    serialize_only = ( 'first_name', 'last_name', 'user_name', 'email', 'posts')
    
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable= False, unique=True)
    last_name = db.Column(db.String(50), nullable= False, unique=True)
    user_name = db.Column(db.String(50), nullable= False, unique=True)
    password_hash = db.Column(db.String(50), unique=True)
    email = db.Column(db.String(50), nullable= False, unique=True)
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    posts = db.relationship('Post', backref='users')
    comments = db.relationship('Comment', backref='users')
    likes = db.relationship('Like', backref='users')
    anime = db.relationship('Anime', backref='users')
    
    
    def __init__(self, first_name, last_name, user_name, email, password_hash):
        self.first_name = first_name
        self.last_name = last_name
        self.user_name = user_name
        self.email = email
        self.password_hash = password_hash
        
        
    def __repr__(self):
        return f'User : {self.user_name}, {self.email}'
    
    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password).decode('UTF-8')
        
    def authenticate(self, password):
        return bcrypt.check_password_hash(self.password, password)
    
    @property
    def password(self):
        raise AttributeError('Password is not a readable attribute')
    
    @password.setter
    def password(self, password):
        self.set_password(password)
        
    @validates('first_name')
    def validate_first_name(self, key, first_name):
        if not first_name:
         raise AssertionError('No first_name provided')
     
        if not re.match("[a-zA-Z]+", first_name):
            
          raise AssertionError('Provided first_name is not an first_name') 
      
        return first_name
    
    @validates('last_name')
    def validate_last_name(self, key, last_name):
        if not last_name:
         raise AssertionError('No last_name provided')
     
        if not re.match("[a-zA-Z]+", last_name):
            
          raise AssertionError('Provided last_name is not an last_name') 
      
        return last_name    
    
    @validates('user_name')
    def validate_user_name(self, key, user_name):
        if not user_name:
         raise AssertionError('No user_name provided')
     
        if not re.match("[a-zA-Z0-9]+", user_name):
            
          raise AssertionError('Provided user_name is not an user_name') 
      
        return user_name
    
    
    @validates('email')
    def validate_email(self, key, email):
        if not email:
         raise AssertionError('No email provided')
     
        if not re.match("[^@]+@[^@]+\.[^@]+", email):
            
          raise AssertionError('Provided email is not an email address') 
      
        return email
    
class Post(db.Model, SerializerMixin):
    serialize_only = ('id', 'text', 'subject', 'username', 'comments', 'likes')
    
    __tablename__ = 'posts'
    
    id = db.Column(db.Integer, primary_key=True)
    subject = db.Column(db.String, default='Enter a description for your post')
    text = db.Column(db.String(500), nullable=False)
    username = db.Column(db.String(50) , db.ForeignKey('users.user_name'))
    
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
    serialize_only = ('id', 'post_id', 'username')
    
    __tablename__ = 'likes'
    
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    username = db.Column(db.String(50) , db.ForeignKey('users.user_name'))

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
   
    
    def __repr__(self):
        return f'Like : {self.id}'


class Comment(db.Model, SerializerMixin):
    serialize_only = ('id', 'text', 'username', 'post_id')
    
    
    __tablename__ = 'comments'
    
    
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(500), nullable=False)
    username = db.Column(db.String(50) , db.ForeignKey('users.user_name'))

    
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
    
    
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
    anime = db.relationship('Anime', backref='users')
    manga = db.relationship('Manga', backref='users')
    characters = db.relationship('Character', backref='users')

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
    serialize_only = ('id', 'text', 'subject', 'username')
    
    __tablename__ = 'posts'
    
    id = db.Column(db.Integer, primary_key=True)
    subject = db.Column(db.String, default='Enter a description for your post')
    text = db.Column(db.String(500), nullable=False)
    username = db.Column(db.String(50) , db.ForeignKey('users.username'))
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
   

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
    
    @validates('title')
    def validates_title (self, key, title):
        if not title:
            raise AssertionError('No title provided')
     
        if not re.match("[a-zA-Z0-9]+", title):
            
            raise AssertionError('Provided title is not an title') 
      
        return title
    
    @validates('description')
    def validates_description (self, key, description):
        if not description:
            raise AssertionError('No description provided')
     
        if not re.match("[a-zA-Z0-9]+", description):
            
            raise AssertionError('Provided description is not an description') 
      
        return description
    
    @validates('image_url')
    def validates_image_url (self, key, image_url):
        if not image_url:
            raise AssertionError('No image_url provided')
     
        if not re.match("[a-zA-Z0-9]+", image_url):
            
            raise AssertionError('Provided image_url is not an image_url') 
      
        return image_url
    
    @validates('genre')
    def validates_genre (self, key, genre):
        if not genre:
            raise AssertionError('No genre provided')
     
        if not re.match("[a-zA-Z0-9]+", genre):
            
            raise AssertionError('Provided genre is not an genre') 
      
        return genre
    
    
class Manga(db.Model, SerializerMixin):
    serialize_only = ('id', 'title', 'description', 'image_url', 'genre')
    
    __tablename__ = 'mangas'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    genre = db.Column(db.String(50), nullable=False)
    image_url = db.Column(db.String(500), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    
    @validates('title')
    def validates_title (self, key, title):
        if not title:
            raise AssertionError('No title provided')
     
        if not re.match("[a-zA-Z0-9]+", title):
            
            raise AssertionError('Provided title is not an title') 
      
        return title
    
    @validates('description')
    def validates_description (self, key, description):
        if not description:
            raise AssertionError('No description provided')
     
        if not re.match("[a-zA-Z0-9]+", description):
            
            raise AssertionError('Provided description is not an description') 
      
        return description
    
    @validates('image_url')
    def validates_image_url (self, key, image_url):
        if not image_url:
            raise AssertionError('No image_url provided')
     
        if not re.match("[a-zA-Z0-9]+", image_url):
            
            raise AssertionError('Provided image_url is not an image_url') 
      
        return image_url
    
    @validates('genre')
    def validates_genre (self, key, genre):
        if not genre:
            raise AssertionError('No genre provided')
     
        if not re.match("[a-zA-Z0-9]+", genre):
            
            raise AssertionError('Provided genre is not an genre') 
      
        return genre
    
class Character(db.Model, SerializerMixin):
    serialize_only = ('id', 'name', 'power', 'tier', 'bio', 'image_url')
    
    __tablename__ = 'characters'
    
    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String(500))
    name = db.Column(db.String(50), nullable=False)
    power = db.Column(db.String(500), nullable=False)
    tier = db.Column(db.String(50), nullable=False)
    bio = db.Column(db.String(500), nullable=False)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    @validates('name')
    def validates_name (self, key, name):
        if not name:
            raise AssertionError('No name provided')
     
        if not re.match("[a-zA-Z0-9]+", name):
            
            raise AssertionError('Provided name is not an name') 
      
        return name
    
    @validates('power')
    def validates_power (self, key, power):
        if not power:
            raise AssertionError('No power provided')
     
        if not re.match("[a-zA-Z0-9]+", power):
            
            raise AssertionError('Provided power is not an power') 
      
        return power
    
    @validates('tier')
    def validates_tier (self, key, tier):
        if not tier:
            raise AssertionError('No tier provided')
     
        if not re.match("[a-zA-Z0-9]+", tier):
            
            raise AssertionError('Provided tier is not an tier') 
      
        return tier
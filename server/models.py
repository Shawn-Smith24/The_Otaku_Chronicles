
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
    serialize_rules = ('-posts.users', '-comments.users', '-likes.users')
    
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), unique=True)
    last_name = db.Column(db.String(50), unique=True)
    user_name = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(50), unique=True)
    email = db.Column(db.String(50), unique=True)
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    posts = db.relationship('Post', backref='users')
    comments = db.relationship('Comment', backref='users')
    likes = db.relationship('Like', backref='users')
    
    def __repr__(self):
        return f'User : {self.user_name}'
    
class Post(db.Model, SerializerMixin):
    serialize_rules = ('-users.posts', '-comments.post', '-likes.post')
    
    __tablename__ = 'posts'
    
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(500), nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
   
    comments = db.relationship('Comment', backref='posts')
    likes = db.relationship('Like', backref='posts')
    
    def __repr__(self):
        return f'Post : {self.text}'
    
    
class Like(db.Model, SerializerMixin):
    serialize_rules = ('-posts.likes', '-users.likes')
    __tablename__ = 'likes'
    
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
   
    
    def __repr__(self):
        return f'Like : {self.id}'


class Comment(db.Model, SerializerMixin):

    serialize_rules = ('-posts.comments', '-users.comments')
    
    __tablename__ = 'comments'
    
    
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(500), nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

   
    

    def __repr__(self):
        return f'Comment : {self.text}'
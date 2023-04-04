#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Post, Comment, Like

print("Seeding users...")
users = [
    {
        'first_name': 'John',
        'last_name': 'Doe',
        'user_name': 'johndoe',
        'password': 'password',
        'email': 'johndoe@gmail.com'
    }
]
def make_users():
    User.query.delete()
    
    for i in range(len(users)):
        user = User(
            id=i+1,
            first_name=users[i]['first_name'], 
            last_name=users[i]['last_name'],
            user_name=users[i]['user_name'],
            email=users[i]['email'],
        )
        user.password = users[i]['password']
        db.session.add(user)

    
    db.session.commit()


print('Seeding posts...')
def make_posts():
    Post.query.delete()
    
    posts = []
    
    for i in range(10):
        post = Post(
            id = i + 1,
            text=fake.text(),
            author_id=randint(1, 10),
        )
        posts.append(post)
    
    db.session.add_all(posts)
    db.session.commit()
    

print('Seeding comments...')
def make_comments():
    Comment.query.delete()
    
    comments = []
    
    for i in range(10):
        comment = Comment(
            id = i + 1,
            text=fake.text(),
            author_id=randint(1, 10),
            post_id=randint(1, 10),
        )
        comments.append(comment)
    
    db.session.add_all(comments)
    db.session.commit()
    
print('Seeding likes...')
def make_likes():
    Like.query.delete()
    
    likes = []
    
    for i in range(100):
        like = Like(
            id = i + 1,
            author_id=randint(1, 10),
            post_id=randint(1, 10),
        )
        likes.append(like)
    
    db.session.add_all(likes)
    db.session.commit()

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        make_users()
        make_posts()
        make_comments()
        make_likes()

        # Seed code goes here!

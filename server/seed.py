#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Post, Comment, Like


#db lists




print("Seeding users...")


def make_users():
    User.query.delete()
    
    users = []
    
    for i in range(10):
        user = User(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            user_name=fake.user_name(),
            email=fake.email(),
            password=fake.password(),
        )
        users.append(user)

    db.session.add_all(users)
    db.session.commit()


print('Seeding posts...')
def make_posts():
    Post.query.delete()
    
    posts = []
    
    for i in range(10):
        post = Post(
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

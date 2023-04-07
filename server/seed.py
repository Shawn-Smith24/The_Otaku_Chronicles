#!/usr/bin/env python3

# Standard library imports
# from random import randint, choice as rc

# Remote library imports
# from faker import Faker

# Local imports
from app import app
from models import db, User, Post, Comment, Like

if __name__ == '__main__':
    # fake = Faker()
    with app.app_context():
        print("Deleting Database...")
        User.query.delete()
        Post.query.delete()
        Comment.query.delete()
        Like.query.delete()


        print("Seeding users...")    
        users = [
            User(
            first_name = 'Shinra',
            last_name = 'Kusakabe',
            user_name = 'devilsfootprints',
            email = 'shinnygod@gmail.com',
            password_hash = 'password1'
        
            )
        ]
        db.session.add_all(users)


        print("Seeding posts...")
        posts = [
            Post(
                subject = 'My first post',
                text = 'I am the best',
                username = 'devilsfootprints'
            ), 
        ]
        db.session.add_all(posts)
        
        print("Seeding comments...")
        comments= []
        db.session.add_all(comments)
        
        print ("Seeding likes...")
        likes = []
        db.session.add_all(likes)

        db.session.commit()
        # Seed code goes here!

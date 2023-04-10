#!/usr/bin/env python3

# Standard library imports
# from random import randint, choice as rc

# Remote library imports
# from faker import Faker

# Local imports
from app import app
from models import db, User, Post, Comment, Like, Anime

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
        
        # print ("Seeding likes...")
        # likes = []
        # db.session.add_all(likes)
        
        
        print("Seeding anime...")
        animes = [
            Anime(
                title = 'Demon Slayer',
                description= 'Kimetsu no Yaiba, also known as Demon Slayer, follows the story of Tanjiro Kamado and his sister turned demon, Nezuko. Determined to find a way to turn Nezuko back into a human Tanjiro joins the Demon Slayer Corps., a group of swordsman whose purpose is to eliminate all demons, to find the answers he seeks',
                image_url = 'https://upload.wikimedia.org/wikipedia/en/0/09/Demon_Slayer_-_Kimetsu_no_Yaiba%2C_volume_1.jpg',
                genre= 'Action, Adventure, Fantasy, Shounen, Supernatural'
            )
        ]
        db.session.add_all(animes)

        db.session.commit()
        # Seed code goes here!

#!/usr/bin/env python3

# Standard library imports
# from random import randint, choice as rc

# Remote library imports
# from faker import Faker

# Local imports
from app import app
from models import db, User, Post,Anime, Manga, Character

if __name__ == '__main__':
    # fake = Faker()
    with app.app_context():
        print("Deleting Database...")
        User.query.delete()
        Post.query.delete()
        Anime.query.delete()
        Manga.query.delete()
        Character.query.delete()


        print("Seeding users...")    
        users = [
            User(
                username = 'shawnsmith',
                _password_hash = 'password',)
        ]
        db.session.add_all(users)


        print("Seeding posts...")
        posts = [
            Post(
                subject = 'Testing Posts',
                text = 'This is a test post',
                username = 'shawnsmith'
            ), 
        ]
        db.session.add_all(posts)
        
        
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

        print("Seeding manga...")
        mangas = [
            Manga(
            title = 'Noragami',
            description = 'A minor god seeking to gain widespread worship teams up with a human girl he saved to gain fame, recognition and at least one shrine dedicated to him. A minor god seeking to gain widespread worship teams up with a human girl he saved to gain fame, recognition and at least one shrine dedicated to him.',
            genre= 'Action, Adventure, Comedy, Drama, Fantasy, Shounen, Supernatural',
            image_url = 'https://4.bp.blogspot.com/-MyWXgXCbtFc/Vv1Q-lf5fFI/AAAAAAAAAvc/EzIJv542GCQ0K_FZMrWKT0h7uA58XkCTw/s1600/yato-kami.jpg'
            ),
        ]
        db.session.add_all(mangas)
        
        print("Seeding characters...")
        characters = [
            Character(
                name = 'Eren Jaeger',
                image_url = 'https://quotesanalysis.com/history/content/images/2022/11/eren-yeager-0.png',
                power = 'Titan Shifter',
                tier = 'S',
                bio = 'Eren Jaeger is the main protagonist of the series. He is a member of the Survey CorpsHe is the son of Grisha Jaeger and Carla Yeager, and the grandson of Dina Fritz. He is also the nephew of Rod Reiss and the cousin of Historia Reiss. Who did nothing wrong!'
                
            )]
        db.session.add_all(characters)
        
        db.session.commit()
        # Seed code goes here!

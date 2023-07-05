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
                subject = 'One Piece',
                text = 'One Piece is peek fiction. It is ridiculously long but it is something every anime fan should watch!',
                username = 'shawnsmith'
            ), 
            Post(
                subject = 'The Rumbling',
                text = 'First off Eren did nothin wrong! The Rumbling is the name given to the final stage of the Great Titan War, in which the Titans are unleashed on the world to wipe out humanity. The Rumbling is the name given to the final stage of the Great Titan War, in which the Titans are unleashed on the world to wipe out humanity.',
                username = 'shawnsmith'
            ),
            Post(
                subject= 'Video Games',
                text= 'Many video games are based on anime series, such as Dragon Ball Z, Naruto, and One Piece. Some video games also incorporate anime-style graphics and storylines.',
                username= 'shawnsmith'
            ),
            Post(
                subject= 'Music',
                text= 'Anime series often feature great soundtracks, and many fans have created covers of their favorite anime songs. Some anime series have also inspired musical acts, such as the band The Pillows, who provided the soundtrack for the anime series FLCL.',
                username= 'shawnsmith'
            ),
            Post(
                subject= 'Storytelling',
                text= 'Anime often tells complex and deep stories that explore themes such as love, loss, and betrayal. Many anime series have intricate plots and well-developed characters that make them more than just cartoons.',
                username= 'shawnsmith'
            )
        ]
        db.session.add_all(posts)
        
        
        print("Seeding anime...")
        animes = [
            Anime(
                title = 'Demon Slayer',
                description= 'Kimetsu no Yaiba, also known as Demon Slayer, follows the story of Tanjiro Kamado and his sister turned demon, Nezuko. Determined to find a way to turn Nezuko back into a human Tanjiro joins the Demon Slayer Corps., a group of swordsman whose purpose is to eliminate all demons, to find the answers he seeks',
                image_url = 'https://upload.wikimedia.org/wikipedia/en/0/09/Demon_Slayer_-_Kimetsu_no_Yaiba%2C_volume_1.jpg',
                genre= 'Action, Adventure, Fantasy, Shounen, Supernatural'
            ), 
            Anime (
                title = 'Attack on Titan',
                description = ' Attack on Titan is set in a world where humanity lives inside cities surrounded by enormous Walls that protect them from Titans, gigantic humanoid creatures who devour humans seemingly without reason.', 
                image_url = 'https://www.slashfilm.com/img/gallery/the-entire-attack-on-titan-timeline-explained/l-intro-1656893069.jpg',
                genre = 'Action, Drama, Fantasy, Shounen, Super Power'
            ), 
            Anime (
                title = 'My Hero Academia',
                description = 'In a world where most people have superpowers, middle school student Izuku Midoriya is part of 20 percent of the population born without them. But his dream is to become a superhero and to attend the premier Japanese school for aspiring superheroes, UA High.',
                image_url = 'https://flxt.tmsimg.com/assets/p12923839_b_h9_aa.jpg',
                genre = 'Action, Comedy, School, Shounen, Super Power'
            ),
            Anime (
                title = 'Fullmetal Alchemist Brotherhood',
                description = 'Fullmetal Alchemist: Brotherhood is a retelling of the original Fullmetal Alchemist anime series. The story follows two brothers, Edward and Alphonse Elric, who are trying to restore their bodies after a failed attempt to bring their mother back to life.',
                image_url = 'https://img2.hulu.com/user/v3/artwork/213ddd1e-0c45-4f84-bb25-ea90ffd6507c?base_image_bucket_name=image_manager&base_image=20f07374-9aa7-43a2-a94c-249b522a545c&size=1200x630&format=jpeg',
                genre = 'Action, Adventure, Military'
            ),
            Anime(
                title = 'JoJo\'s Bizarre Adventure',
                description = 'JoJo\'s Bizarre Adventure tells the story of the Joestar family, a family whose various members discover they are destined to take down supernatural foes using powers that they possess.',
                image_url = 'https://www.looper.com/img/gallery/the-untold-truth-of-jojos-bizarre-adventure/what-is-jojos-bizarre-adventure-1584147803.jpg',
                genre = 'Action, Adventure, Comedy, Drama, Shounen, Supernatural'
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
            Manga(
                title = 'Tower of God',
                description = 'The Tower of God is a mysterious place of unfathomable height, said to contain the most dangerous creatures and the most unimaginable treasures. The Tower of God is a mysterious place of unfathomable height, said to contain the most dangerous creatures and the most unimaginable treasures.',
                genre = 'Action, Fiction, Dark Fantasy',
                image_url = 'https://upload.wikimedia.org/wikipedia/en/7/7d/Tower_of_God_Volume_1_Cover.jpg'
                
            ),
            Manga(
                title = 'One Piece',
                description = 'Follows the adventures of Monkey D. Luffy and his pirate crew in order to find the greatest treasure ever left by the legendary Pirate, Gold Roger. The famous mystery treasure named "One Piece".',
                genre = 'Action, Adventure, Shounen',
                image_url= 'https://static1.colliderimages.com/wordpress/wp-content/uploads/2021/11/One-Piece-Character-Guide.jpg'
            ),
            Manga(
                title = 'Tokyo Ghoul',
                description = 'Tokyo Ghoul is set in an alternate reality where ghouls, creatures that look like normal people but can only survive by eating human flesh, live among the human population in secrecy, hiding their true nature in order to evade pursuit from the authorities.',
                genre = 'Dark Fantasy, Horror, Psychological, Supernatural, Thriller',
                image_url = 'https://upload.wikimedia.org/wikipedia/en/e/e5/Tokyo_Ghoul_volume_1_cover.jpg'
            ),
            Manga(
                title = 'Bleach',
                description = 'It follows the adventures of a teenager Ichigo Kurosaki, who inherits his parents\' destiny after he obtains the powers of a Soul Reaper—a death personification similar to the Grim Reaper—from another Soul Reaper, Rukia Kuchiki.',
                genre = 'Action, Adventure, Shounen, Supernatural',
                image_url = 'https://upload.wikimedia.org/wikipedia/en/7/72/Bleachanime.png'
            )
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
                
            ),
            Character(
                name = 'Gojo Satoru',
                image_url = 'https://wallpapers.com/images/hd/deadly-gojo-satoru-fan-art-dld3h1qodm9hrs1l.jpg',
                power = 'Cursed Energy, Immense Speed & Reflexes',
                tier = 'S++',
                bio = 'He is a special grade jujutsu sorcerer and widely recognized as the strongest in the world. Satoru is the pride of the Gojo Family, the first person to inherit both the Limitless and the Six Eyes in four hundred years. He works as a teacher at the Tokyo Jujutsu High and uses his influence to protect and train strong young allies.'
            ),
            Character(
                name = 'Guts',
                image_url = 'https://upload.wikimedia.org/wikipedia/en/d/db/GutsBerserk.PNG',
                power = 'Superhuman Strength',
                tier = 'A',
                bio = 'Guts, renowned as the "Black Swordsman", is a former mercenary and branded wanderer who travels the world in a constant internal struggle between pursuing his own ends and upholding his attachments to those dear to him.'
            ),
            Character(
                name = 'Koro Sensei',
                image_url = 'https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/01/Featured-Koro-Sensei-Carrying-A-Missle.jpg',
                power = 'Superhuman Speed',
                tier = 'A+',
                bio = 'Korosensei is the homeroom teacher for Class 3-E of Kunugigaoka Junior High School, and the supporting protagonist of Assassination Classroom. He claimed to be responsible for creating the permanent crescent moon and said that he planned to destroy the earth after "teaching" Class 3-E for a year.'
            )
            
            ]
        db.session.add_all(characters)
        
        db.session.commit()
        # Seed code goes here!

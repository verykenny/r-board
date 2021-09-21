from app.models import db, User, Board, BoardUser


# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')

    board1 = Board(
        name='Home', backgroundUrl='/bg-whiteboard.png'
    )
    board2 = Board(
        name='School', backgroundUrl='/bg-whiteboard.png'
    )
    board3 = Board(
        name='Home', backgroundUrl='/bg-whiteboard.png'
    )
    board4 = Board(
        name='School', backgroundUrl='/bg-whiteboard.png'
    )
    board5 = Board(
        name='Home', backgroundUrl='/bg-whiteboard.png'
    )

    BoardUser(user=demo, board=board1)
    BoardUser(user=demo, board=board2)
    BoardUser(user=marnie, board=board3)
    BoardUser(user=marnie, board=board4)
    BoardUser(user=bobbie, board=board5)


    db.session.add(board1)
    db.session.add(board2)
    db.session.add(board3)
    db.session.add(board4)
    db.session.add(board5)
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE boards RESTART IDENTITY CASCADE;')
    db.session.commit()

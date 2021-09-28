from app.models import db, User, Board, BoardUser, ToDoList, ToDo, StickyNote


# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')

    board1 = Board(
        name='Home', backgroundUrl='https://pseudogram-bucket.s3.amazonaws.com/bg-whiteboard.png'
    )
    board2 = Board(
        name='School', backgroundUrl='https://pseudogram-bucket.s3.amazonaws.com/bg-whiteboard.png'
    )
    board3 = Board(
        name='Home', backgroundUrl='https://pseudogram-bucket.s3.amazonaws.com/bg-whiteboard.png'
    )
    board4 = Board(
        name='School', backgroundUrl='https://pseudogram-bucket.s3.amazonaws.com/bg-whiteboard.png'
    )
    board5 = Board(
        name='Home', backgroundUrl='https://pseudogram-bucket.s3.amazonaws.com/bg-whiteboard.png'
    )

    BoardUser(user=demo, board=board1)
    BoardUser(user=demo, board=board2)
    BoardUser(user=marnie, board=board3)
    BoardUser(user=marnie, board=board4)
    BoardUser(user=bobbie, board=board5)

    todolist1 = ToDoList(
        name='Chores',
        xPos=500,
        yPos=150
    )

    todo1 = ToDo(content='take out trash')
    todo2 = ToDo(content='do dishes')

    seed1 = StickyNote(content='Soccer Practice: 5:30p!')

    todolist1.todos.append(todo1)
    todolist1.todos.append(todo2)

    board1.lists.append(todolist1)

    seed1.board = board1

    db.session.add(todolist1)
    db.session.add(todo1)
    db.session.add(todo2)

    db.session.add(seed1)

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

from app.models import db, User, Board, BoardUser, ToDoList, ToDo, StickyNote


# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    luke = User(
        username='luke', email='luke@aa.io', password='password'
    )
    amanda = User(
        username='amanda', email='amanda@aa.io', password='password'
    )
    cathy = User(
        username='cathy', email='cathy@aa.io', password='password'
    )
    mom = User(
        username='mom', email='mom@aa.io', password='password'
    )
    reggie = User(
        username='reggie', email='reggie@aa.io', password='password'
    )
    pinque = User(
        username='pinque', email='pinque@aa.io', password='password'
    )
    mozart = User(
        username='mozart', email='mozart@aa.io', password='password'
    )
    dennis = User(
        username='dennis', email='dennis@aa.io', password='password'
    )
    geoffrey = User(
        username='geoffrey', email='geoffrey@aa.io', password='password'
    )
    caleb = User(
        username='caleb', email='caleb@aa.io', password='password'
    )
    sean = User(
        username='sean', email='sean@aa.io', password='password'
    )
    kenny = User(
        username='kenny', email='kenny@aa.io', password='password'
    )

    board1 = Board(
        name='Home', backgroundUrl='https://pseudogram-bucket.s3.amazonaws.com/bg-blackboard2.jpeg'
    )
    BoardUser(user=demo, board=board1)
    BoardUser(user=marnie, board=board1, owner=False, verified=True)
    BoardUser(user=bobbie, board=board1, owner=False, verified=True)
    BoardUser(user=luke, board=board1, owner=False, verified=True)
    BoardUser(user=geoffrey, board=board1, owner=False, verified=False)
    BoardUser(user=mozart, board=board1, owner=False, verified=False)

    board2 = Board(
        name='School', backgroundUrl='https://pseudogram-bucket.s3.amazonaws.com/bg-whiteboard.png'
    )
    BoardUser(user=demo, board=board2)
    BoardUser(user=kenny, board=board2, owner=False, verified=True)
    BoardUser(user=caleb, board=board2, owner=False, verified=False)

    board3 = Board(
        name='Home', backgroundUrl='https://pseudogram-bucket.s3.amazonaws.com/bg-whiteboard.png'
    )
    BoardUser(user=marnie, board=board3)
    BoardUser(user=pinque, board=board3, owner=False, verified=True)
    BoardUser(user=reggie, board=board3, owner=False, verified=True)

    board4 = Board(
        name='Work', backgroundUrl='https://pseudogram-bucket.s3.amazonaws.com/bg-blackboard2.jpeg'
    )
    BoardUser(user=marnie, board=board4)
    BoardUser(user=mozart, board=board4, owner=False, verified=True)

    board5 = Board(
        name='Work', backgroundUrl='https://pseudogram-bucket.s3.amazonaws.com/bg-whiteboard.png'
    )
    BoardUser(user=bobbie, board=board5)

    board6 = Board(
        name='Project Board', backgroundUrl='https://pseudogram-bucket.s3.amazonaws.com/bg-whiteboard.png'
    )
    BoardUser(user=bobbie, board=board6)
    BoardUser(user=kenny, board=board6, owner=False, verified=True)
    BoardUser(user=caleb, board=board6, owner=False, verified=True)
    BoardUser(user=sean, board=board6, owner=False, verified=True)
    BoardUser(user=demo, board=board6, owner=False, verified=True)

    board7 = Board(
        name='Home', backgroundUrl='https://pseudogram-bucket.s3.amazonaws.com/bg-blackboard2.jpeg'
    )
    BoardUser(user=luke, board=board7)

    board8 = Board(
        name='School', backgroundUrl='https://pseudogram-bucket.s3.amazonaws.com/bg-whiteboard.png'
    )
    BoardUser(user=amanda, board=board8)

    board9 = Board(
        name='Work', backgroundUrl='https://pseudogram-bucket.s3.amazonaws.com/bg-whiteboard.png'
    )
    BoardUser(user=cathy, board=board9)

    board10 = Board(
        name='School', backgroundUrl='https://pseudogram-bucket.s3.amazonaws.com/bg-blackboard2.jpeg'
    )
    BoardUser(user=mom, board=board10)

    board11 = Board(
        name='Work', backgroundUrl='https://pseudogram-bucket.s3.amazonaws.com/bg-whiteboard.png'
    )
    BoardUser(user=reggie, board=board11)

    board12 = Board(
        name='Work', backgroundUrl='https://pseudogram-bucket.s3.amazonaws.com/bg-blackboard2.jpeg'
    )
    BoardUser(user=mozart, board=board12)
    BoardUser(user=kenny, board=board12, owner=False, verified=True)
    BoardUser(user=dennis, board=board12, owner=False, verified=True)

    board13 = Board(
        name='Home', backgroundUrl='https://pseudogram-bucket.s3.amazonaws.com/bg-whiteboard.png'
    )
    BoardUser(user=dennis, board=board13)

    board14 = Board(
        name='Work', backgroundUrl='https://pseudogram-bucket.s3.amazonaws.com/bg-whiteboard.png'
    )
    BoardUser(user=geoffrey, board=board14)

    board15 = Board(
        name='School', backgroundUrl='https://pseudogram-bucket.s3.amazonaws.com/bg-whiteboard.png'
    )
    BoardUser(user=caleb, board=board15)

    board16 = Board(
        name='Work', backgroundUrl='https://pseudogram-bucket.s3.amazonaws.com/bg-blackboard2.jpeg'
    )
    BoardUser(user=sean, board=board16)

    board17 = Board(
        name='Kids Stuff', backgroundUrl='https://pseudogram-bucket.s3.amazonaws.com/bg-blackboard2.jpeg'
    )
    BoardUser(user=kenny, board=board17)
    BoardUser(user=geoffrey, board=board17, owner=False, verified=True)
    BoardUser(user=sean, board=board17, owner=False, verified=True)
    BoardUser(user=caleb, board=board17, owner=False, verified=True)
    BoardUser(user=demo, board=board17, owner=False, verified=True)

    board18 = Board(
        name='Work', backgroundUrl='https://pseudogram-bucket.s3.amazonaws.com/bg-blackboard2.jpeg'
    )
    BoardUser(user=luke, board=board18)

    board19 = Board(
        name='Home', backgroundUrl='https://pseudogram-bucket.s3.amazonaws.com/bg-whiteboard.png'
    )
    BoardUser(user=pinque, board=board19)

    board20 = Board(
        name='Work', backgroundUrl='https://pseudogram-bucket.s3.amazonaws.com/bg-whiteboard.png'
    )
    BoardUser(user=cathy, board=board20)

    todolist1 = ToDoList(
        name='Chores',
        xPos=400,
        yPos=120
    )
    todo1 = ToDo(content='take out trash', completed=True)
    todo2 = ToDo(content='do dishes')
    todo3 = ToDo(content='feed pickels')
    todo4 = ToDo(content='find pickels...again')
    todolist1.todos.append(todo1)
    todolist1.todos.append(todo2)
    todolist1.todos.append(todo3)
    todolist1.todos.append(todo4)
    board1.lists.append(todolist1)

    todolist2 = ToDoList(
        name='Homework',
        xPos=600,
        yPos=170
    )

    todo5 = ToDo(content='math, pg 3-45', completed=True)
    todo6 = ToDo(content='10 min speech on how cute pickles is')
    todo7 = ToDo(content='get parking pass')

    todolist2.todos.append(todo5)
    todolist2.todos.append(todo6)
    todolist2.todos.append(todo7)
    board2.lists.append(todolist2)

    todolist3 = ToDoList(
        name='components',
        xPos=600,
        yPos=100
    )

    todo8 = ToDo(content='add friend button')
    todo9 = ToDo(content='login modal', completed=True)
    todo10 = ToDo(content='alert modal')

    todolist3.todos.append(todo8)
    todolist3.todos.append(todo9)
    todolist3.todos.append(todo10)
    board6.lists.append(todolist3)

    todolist4 = ToDoList(
        name='Geoffrey todo',
        xPos=620,
        yPos=400
    )

    todo11 = ToDo(content='write out butter ingredients', completed=True)
    todo12 = ToDo(content='apologize to Mrs. Wasserheim')
    todo13 = ToDo(content='work on dinosaur diorama')

    todolist4.todos.append(todo11)
    todolist4.todos.append(todo12)
    todolist4.todos.append(todo13)
    board17.lists.append(todolist4)

    todolist5 = ToDoList(
        name='spelling test',
        xPos=500,
        yPos=135,
    )

    todo14 = ToDo(content='cucumber')
    todo15 = ToDo(content='vinegar')
    todo16 = ToDo(content='pickles')

    todolist5.todos.append(todo14)
    todolist5.todos.append(todo15)
    todolist5.todos.append(todo16)
    board17.lists.append(todolist5)

    sticky1 = StickyNote(
        content='Soccer Practice: 5:30p! Remember what happened last time you forgot :(((',
        xPos=150,
        yPos=350
    )
    sticky1.board = board1

    sticky2 = StickyNote(
        content='I don\'t know who let pickles out again but I swear I\'ll force everyone in this family to eat brusslesprouts if it happens again!',
        xPos=750,
        yPos=250
    )
    sticky2.board = board1

    sticky3 = StickyNote(
        content='"The beautiful thing about learning is that no one can take it away from you."  -B.B. King ',
        xPos=750,
        yPos=450
    )
    sticky3.board = board2

    sticky4 = StickyNote(
        content='"Opportunities multiply as they are seized."  -Sun Tzu ',
        xPos=250,
        yPos=150
    )
    sticky4.board = board2

    sticky5 = StickyNote(
        content='Daily Stand-up Meeting: 6:30a',
        xPos=850,
        yPos=330
    )
    sticky5.board = board6

    sticky6 = StickyNote(
        content='Everytime you push to main, an angle loses their wings and my cat, pickles, gets lost outside.',
        xPos=200,
        yPos=430
    )
    sticky6.board = board6

    sticky7 = StickyNote(
        content='Today, Geoffrey asked Mrs. Wasserheim why she was visible in technicolor if she was born before 1870...',
        xPos=800,
        yPos=80
    )
    sticky7.board = board17

    for user in [demo, marnie, bobbie, luke, amanda, cathy, mom, reggie, pinque, mozart, dennis, geoffrey, caleb, sean, kenny]:
        db.session.add(user)

    for board in [board1, board2, board3, board4, board5, board6, board7, board8, board9, board10, board11, board12, board13, board14, board15, board16, board17, board18, board19, board20]:
        db.session.add(board)

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

from .db import db

boardusers = db.Table('board_users',
                      db.Column('userId', db.Integer, db.ForeignKey(
                          'users.id'), primary_key=True),
                      db.Column('boardId', db.Integer, db.ForeignKey(
                          'boards.id'), primary_key=True),
                      db.Column('owner', db.Boolean),
                      db.Column('verified', db.Boolean),
                      ),

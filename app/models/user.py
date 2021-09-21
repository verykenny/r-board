from .db import db
from .boarduser import board_users
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


board_users = db.Table('board_users',
                       db.Column('userId', db.Integer, db.ForeignKey(
                           'users.id'), primary_key=True),
                       db.Column('boardId', db.Integer, db.ForeignKey(
                           'boards.id'), primary_key=True),
                       db.Column('owner', db.Boolean),
                       db.Column('verified', db.Boolean),
                       ),


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    boards = db.relationship(
        'Board', secondary=board_users, back_populates='users')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }


class Board(db.Model):
    __tablename__ = 'boards'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(25), nullable=False)
    backgroundUrl = db.Column(
        db.String, nullable=False, default='/bg-whiteboard.png')

    users = db.relationship(
        'User', secondary=board_users, back_populates='boards')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'backgroundUrl': self.backgroundUrl
        }

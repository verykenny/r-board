from .db import db


class BoardUser(db.Model):
    __tablename__ = 'board_users'
    userId = db.Column(db.ForeignKey('users.id'), primary_key=True)
    boardId = db.Column(db.ForeignKey('boards.id'), primary_key=True)

    owner = db.Column(db.Boolean, default=True)
    verified = db.Column(db.Boolean, default=True)

    user = db.relationship('User', back_populates='boards')
    board = db.relationship('Board', back_populates='users')

    def board_to_dict(self):
        return self.board.to_dict()

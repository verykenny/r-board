from .db import db


class BoardUser(db.Model):
    __tablename__ = 'board_users'
    userId = db.Column(db.ForeignKey('users.id'), primary_key=True)
    boardId = db.Column(db.ForeignKey('boards.id'), primary_key=True)

    owner = db.Column(db.Boolean, default=True)
    verified = db.Column(db.Boolean, default=True)

    user = db.relationship('User', back_populates='boards')
    board = db.relationship('Board', back_populates='users')

    def to_dict(self):
        return {
            'user': self.user.to_dict(),
            'board': self.board.to_dict(),
            'verified': self.verified,
            'owner': self.owner,
        }

    def board_to_dict(self):
        board = self.board.to_dict()
        board['owner'] = self.owner
        return board

    def user_to_dict(self):
        return self.user.to_dict()

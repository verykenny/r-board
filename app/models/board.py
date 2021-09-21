from .db import db
from .boarduser import board_users


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

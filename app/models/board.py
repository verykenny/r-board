from .db import db



class Board(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(25), nullable=False)
    backgroundUrl = db.Column(db.String, nullable=False, default='/bg-whiteboard.png')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'backgroundUrl': self.backgroundUrl
        }

from .db import db
from datetime import datetime


class StickyNote(db.Model):
    __tablename__ = 'sticky_notes'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=True)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    xPos = db.Column(db.Integer, nullable=False, default=0)
    yPos = db.Column(db.Integer, nullable=False, default=0)

    boardId = db.Column(db.Integer, db.ForeignKey('boards.id'))

    board = db.relationship('Board', back_populates='stickyNotes')

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'createdAt': self.createdAt.strftime('%Y-%m-%d %H:%M:%S'),
            'xPos': self.xPos,
            'yPos': self.yPos,
        }

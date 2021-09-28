from .db import db


class Board(db.Model):
    __tablename__ = 'boards'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(25), nullable=False)
    backgroundUrl = db.Column(
        db.String, nullable=False, default='/bg-whiteboard.png')

    users = db.relationship('BoardUser', back_populates='board', cascade='all, delete')

    lists = db.relationship('ToDoList', back_populates='board', cascade='all, delete')
    stickyNotes = db.relationship('StickyNote', back_populates='board', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'backgroundUrl': self.backgroundUrl
        }

    def to_dict_items(self):
        return {
            'todoLists': [todoList.to_dict() for todoList in self.lists],
            'stickyNotes': [stickyNote.to_dict() for stickyNote in self.stickyNotes]
        }

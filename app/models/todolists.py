from .db import db
from datetime import datetime


class ToDoList(db.Model):
    __tablename__ = 'todo_lists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(25), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    xPos = db.Column(db.Integer, nullable=False, default=0)
    yPos = db.Column(db.Integer, nullable=False, default=0)

    boardId = db.Column(db.Integer, db.ForeignKey('boards.id'))

    board = db.relationship('Board', back_populates='lists')
    todos = db.relationship('ToDo', back_populates='todoList', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'createdAt': self.createdAt.strftime('%Y-%m-%d %H:%M:%S'),
            'xPos': self.xPos,
            'yPos': self.yPos,
            'todos': [todo.to_dict() for todo in self.todos]
        }


class ToDo(db.Model):
    __tablename__ = 'todos'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(50), nullable=False)
    completed = db.Column(db.Boolean, nullable=False, default=False)

    todoListId = db.Column(db.Integer, db.ForeignKey('todo_lists.id'))

    todoList = db.relationship('ToDoList', back_populates='todos')

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'completed': self.completed
        }

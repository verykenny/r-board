from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField



class ToDoListItemForm(FlaskForm):
    content = StringField('name')
    completed = BooleanField('completed')

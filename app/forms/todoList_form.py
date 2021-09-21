from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField



class ToDoListForm(FlaskForm):
    name = StringField('name')
    xPos = IntegerField('xPos')
    yPos = IntegerField('yPos')

from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField


class StickyNoteForm(FlaskForm):
    content = StringField('content')
    xPos = IntegerField('xPos')
    yPos = IntegerField('yPos')

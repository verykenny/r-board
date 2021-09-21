from flask_wtf import FlaskForm
from wtforms import StringField


class BoardForm(FlaskForm):
    name = StringField('name')

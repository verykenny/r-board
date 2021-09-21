from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms import validators
from wtforms.validators import DataRequired


class BoardForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    backgroundUrl = StringField('backgroundUrl', validators=[DataRequired()])

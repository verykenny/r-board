from flask_wtf import FlaskForm
from wtforms import BooleanField


class BoardUserForm(FlaskForm):
    verified = BooleanField('verified')

from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    email = form.data['email']
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError(
            'Unable to verify email/password.')
    if not user.check_password(password):
        raise ValidationError(
            'Unable to verify email/password.')


class LoginForm(FlaskForm):
    email = StringField('email', validators=[
        DataRequired(message='Please provide an email.'),
        Email(message='Please provide a valid email.'),
    ])
    password = StringField('password', validators=[
        DataRequired(message='Please provide a password.'),
        password_matches,
    ])

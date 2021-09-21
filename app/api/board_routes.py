from app.forms.board_form import BoardForm
from .validation_errors import validation_errors_to_error_messages
from flask import Blueprint, request
from flask_login import login_required


board_routes = Blueprint('boards', __name__)


@board_routes.route('/', methods=['POST'])
@login_required
def create_board():
    form = BoardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        return {'board': 'success'}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@board_routes.route('/<int:boardId>')
@login_required
def board_items(boardId):
    return {'boardItems': 'success'}

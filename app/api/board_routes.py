from flask import Blueprint
from flask_login import login_required


board_routes = Blueprint('boards', __name__)


@board_routes.route('/', methods=['POST'])
@login_required
def create_board():
    return {'board': 'success'}


@board_routes.route('/<int:boardId>')
@login_required
def board_items(boardId):
    return {'boardItems': 'success'}

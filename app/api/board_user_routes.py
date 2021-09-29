from flask import Blueprint

board_user_routes = Blueprint('board_users', __name__)


@board_user_routes.route('/users/<int:userId>')
def board_user_items(userId):
    return { 'boardUsers': 'succes'}

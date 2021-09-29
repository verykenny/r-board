from app.models.boarduser import BoardUser
from flask import Blueprint, request
from app.models import db, User, Board

board_user_routes = Blueprint('board_users', __name__)


@board_user_routes.route('/users/<int:userId>/boards/<int:boardId>', methods=['GET', 'PUT', 'DELETE'])
def board_user_items(userId, boardId):
    user = User.query.get(userId)
    board = Board.query.get(boardId)
    if request.method == 'GET':
        boardUsers = BoardUser.query.filter_by(boardId=boardId).all()
        return {'boardUsers': [boardUser.to_dict() for boardUser in boardUsers]}
    elif request.method == 'PUT':
        return {'boardUsers': 'PUT'}
    elif request.method == 'DELETE':
        return {'boardUsers': 'DELETE'}

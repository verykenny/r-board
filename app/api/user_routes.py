from flask import Blueprint, request
from flask_login import login_required
from app.models import db, User, Board, BoardUser

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/boards')
@login_required
def boards(id):
    user = User.query.get(id)
    return {'boards': [board.board_to_dict() for board in user.boards]}


@user_routes.route('/<int:userId>/boards/<int:boardId>', methods=['POST'])
@login_required
def add_user(userId, boardId):
    """
    Add user access to board as a BoardUser item
    """
    board = Board.query.get(boardId)
    user = User.query.get(userId)
    boardUser = BoardUser(user=user, board=board, owner=False, verified=False)
    db.session.add(board)
    db.session.add(user)
    db.session.commit()
    return {'user': user.to_dict(), 'board': boardUser.board_to_dict()}

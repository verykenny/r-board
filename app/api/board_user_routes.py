from app.models.boarduser import BoardUser
from flask import Blueprint, request
from app.models import db, User, Board
from app.forms import BoardUserForm
from .validation_errors import validation_errors_to_error_messages


board_user_routes = Blueprint('board_users', __name__)


@board_user_routes.route('/users/<int:userId>/boards/<int:boardId>', methods=['GET', 'PUT', 'DELETE'])
def board_user_items(userId, boardId):
    user = User.query.get(userId)
    board = Board.query.get(boardId)
    if request.method == 'GET':
        boardUsers = BoardUser.query.filter_by(boardId=boardId).all()
        return {'boardUsers': [boardUser.to_dict() for boardUser in boardUsers]}
    elif request.method == 'PUT':
        form = BoardUserForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            boardUser = BoardUser.query.filter_by(boardId=boardId, userId=userId).first()
            boardUser.verified = form['verified'].data
            db.session.add(user)
            db.session.add(board)
            db.session.commit()
            return {'boardUsers': boardUser.to_dict()}
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    elif request.method == 'DELETE':
        boardUser = BoardUser.query.filter_by(boardId=boardId, userId=userId).first()
        db.session.delete(boardUser)
        db.session.commit()
        return {'deleted': boardUser.to_dict()}

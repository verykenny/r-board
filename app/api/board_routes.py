from app.models import db, Board, User, BoardUser
from app.forms.board_form import BoardForm
from .validation_errors import validation_errors_to_error_messages
from flask import Blueprint, request
from flask_login import login_required, current_user


board_routes = Blueprint('boards', __name__)


@board_routes.route('/', methods=['POST'])
@login_required
def create_board():
    """
    Create a new board
    """
    user = User.query.get(current_user.get_id())
    form = BoardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        board = Board()
        form.populate_obj(board)
        BoardUser(user=user, board=board)
        db.session.add(board)
        db.session.commit()
        return {'board': board.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@board_routes.route('/<int:boardId>', methods=['GET', 'PUT', 'DELETE'])
@login_required
def boards(boardId):
    """
    GET board items
    PUT update board
    DELETE board
    """
    board = Board.query.get(boardId)
    if request.method == 'GET':
        return {'boardItems': 'placeholder -- need to update to_dicts to include nested info'}
    elif request.method == 'PUT':
        form = BoardForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            board.name = form['name'].data
            board.backgroundUrl = form['backgroundUrl'].data
            db.session.add(board)
            db.session.commit()
            return {'board': board.to_dict()}
        return {'boardItems': 'patch'}
    elif request.method == 'DELETE':
        db.session.delete(board)
        db.session.commit()
        return {'deleted': board.to_dict()}

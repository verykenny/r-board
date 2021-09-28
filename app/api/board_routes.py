from app.models import db, Board, User, BoardUser, ToDoList, StickyNote
from app.forms import StickyNoteForm, BoardForm, ToDoListForm
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
        return {'boardItems': board.to_dict_items()}
    elif request.method == 'PUT':
        form = BoardForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            board.name = form['name'].data
            board.backgroundUrl = form['backgroundUrl'].data
            db.session.add(board)
            db.session.commit()
            return {'board': board.to_dict()}
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    elif request.method == 'DELETE':
        db.session.delete(board)
        db.session.commit()
        return {'deleted': board.to_dict()}


@board_routes.route('/<int:boardId>/todo_lists', methods=['POST'])
@login_required
def create_todo_list(boardId):
    """
    Create a new todo list
    """
    board = Board.query.get(boardId)
    form = ToDoListForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        todoList = ToDoList()
        form.populate_obj(todoList)
        board.lists.append(todoList)
        db.session.add(board)
        db.session.commit()

        return {'todoList': todoList.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@board_routes.route('/<int:boardId>/sticky_notes', methods=['POST'])
@login_required
def create_sticky_note(boardId):
    """
    Create a new sticky note
    """
    board = Board.query.get(boardId)
    form = StickyNoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        sticky_note = StickyNote()
        form.populate_obj(sticky_note)
        board.stickyNotes.append(sticky_note)
        db.session.add(board)
        db.session.commit()

        return {'stickyNote': sticky_note.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

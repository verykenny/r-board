from app.forms.todoList_form import ToDoListForm
from flask import Blueprint, request
from app.models import db, User, ToDoList
from flask_login import login_required, current_user
from .validation_errors import validation_errors_to_error_messages


todolist_routes = Blueprint('todo_lists', __name__)


@todolist_routes.route('/<int:todoListId>', methods=['PUT', 'DELETE'])
def todo_lists(todoListId):
    todoList = ToDoList.query.get(todoListId)
    if request.method == 'PUT':
        form = ToDoListForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            todoList.name = form['name'].data
            todoList.xPos = form['xPos'].data
            todoList.yPos = form['yPos'].data

            db.session.add(todoList)
            db.session.commit()
            return {'todoList': todoList.to_dict()}
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    elif request.method == 'DELETE':
        db.session.delete(todoList)
        db.session.commit()
        return {'deleted': todoList.to_dict()}

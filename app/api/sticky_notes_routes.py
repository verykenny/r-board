from app.forms.todoListItem_form import ToDoListItemForm
from app.forms.todoList_form import ToDoListForm
from flask import Blueprint, request
from app.models import db, User, ToDoList, ToDo
from flask_login import login_required, current_user
from .validation_errors import validation_errors_to_error_messages


sticky_notes_routes = Blueprint('todo_lists', __name__)


@sticky_notes_routes.route('/<int:todoListId>', methods=['PUT', 'DELETE'])
def todo_lists(todoListId):
    """
    Update a todolist
    Delete a todolist
    """
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


@sticky_notes_routes.route('/<int:todoListId>/todo_list_items', methods=['POST'])
def create_todo(todoListId):
    """
    Create a todo
    """
    todoList = ToDoList.query.get(todoListId)
    form = ToDoListItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        todo = ToDo()
        form.populate_obj(todo)
        todoList.todos.append(todo)
        db.session.add(todo)
        db.session.commit()

        return {'todo': todo.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

from app.forms.todoListItem_form import ToDoListItemForm
from app.forms.todoList_form import ToDoListForm
from flask import Blueprint, request
from app.models import db, User, ToDoList, ToDo
from flask_login import login_required, current_user
from .validation_errors import validation_errors_to_error_messages


todoitem_routes = Blueprint('todo_items', __name__)


@todoitem_routes.route('/<int:todoListItemId>', methods=['PUT'])
def update_todo(todoListItemId):
    todo = ToDo.query.get(todoListItemId)
    form = ToDoListItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        todo.completed = form['completed'].data
        db.session.add(todo)
        db.session.commit()

        return {'todo': todo.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

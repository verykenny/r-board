from app.forms.todoList_form import ToDoListForm
from flask import Blueprint, request
from app.models import db, User, ToDoList
from flask_login import login_required, current_user


todolist_routes = Blueprint('todo_lists', __name__)



@todolist_routes.route('/<int:todoListId>', methods=['PUT', 'DELETE'])
def todo_lists(todoListId):
    return {'message': 'success'}

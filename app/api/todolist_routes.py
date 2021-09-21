from flask import Blueprint


todolist_routes = Blueprint('todo_lists', __name__)


@todolist_routes.route('/', methods=['POST'])
def create_todo_list():
    return {'message': 'success'}


@todolist_routes.route('/<int:todoListId>', methods=['PUT', 'DELETE'])
def todo_lists(todoListId):
    return {'message': 'success'}

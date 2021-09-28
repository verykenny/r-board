from flask import Blueprint, request
from app.models import db, User, StickyNote
from app.forms import StickyNoteForm
from flask_login import login_required, current_user
from .validation_errors import validation_errors_to_error_messages


sticky_notes_routes = Blueprint('sticky_notes', __name__)


@sticky_notes_routes.route('/<int:stickyNoteId>', methods=['PUT', 'DELETE'])
def sticky_notes(stickyNoteId):
    """
    Update a stickyNote
    Delete a stickyNote
    """
    stickyNote = StickyNote.query.get(stickyNoteId)
    if request.method == 'PUT':

        form = StickyNoteForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            stickyNote.content = form['content'].data
            stickyNote.xPos = form['xPos'].data
            stickyNote.yPos = form['yPos'].data

            db.session.add(stickyNote)
            db.session.commit()
            return {'stickyNote': stickyNote.to_dict()}
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    elif request.method == 'DELETE':
        db.session.delete(stickyNote)
        db.session.commit()
        return {'deleted': stickyNote.to_dict()}

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { noteDelete, noteToggle } from '../../actions/index';
import { Link } from 'react-router';
import { dateConverter } from '../../helpers/helperfunctions';

class NoteShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  deleteNote() {
    const uid = this.props.uid;
    const nid = this.props.note._id;
    this.props.noteDelete({ uid, nid });
  }

  backToNotes() {
    this.props.noteToggle("index");
  }
  render() {
    const { note } = this.props;

    if(!note) {
      return <div>Loading...</div>
    }

    return (
        <div className="noteShowBox">
          <div className="noteShowBtnGroup">
            <button className="btn btn-danger leftButton" onClick={this.backToNotes.bind(this)}>Back To Notes</button>
            <button className="btn btn-danger pull-xs-right rightButton" onClick={this.deleteNote.bind(this)}>Delete Note</button>
          </div>
          <div className="noteShowHead">
            <p className="noteShowTitle">{note.title}</p>
            <p className="noteShowDate">{dateConverter(note.date)}</p>
          </div>
          <div className="noteShowContent">
            <p>{note.content}</p>
          </div>
        </div>
    )
  };
}

function mapStateToProps (state) {
  return { note: state.notes.note, uid: state.auth.uid };
}

export default connect(mapStateToProps, { noteDelete, noteToggle })(NoteShow);

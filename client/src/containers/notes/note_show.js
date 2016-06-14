import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { noteDelete } from '../../actions/index';
import { Link } from 'react-router';
import { dateConverter } from '../../helpers/helperfunctions';

class NoteShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  deleteNote() {
    const uid = this.props.auth.uid;
    const nid = this.props.note._id;
    this.props.noteDelete({ uid, nid });
  }

  render() {
    const { note } = this.props;

    if(!note) {
      return <div>Loading...</div>
    }
    
    return (
      <div>
      <Link to="/dashboard">Back To Dashboard</Link>
      <button
        className="btn btn-danger pull-xs-right"
        onClick={this.deleteNote.bind(this)}>
          Delete Post
      </button>
        <h3>{note.title}</h3>
        <h6>{dateConverter(note.date)}</h6>
        <p>{note.content}</p>
      </div>
    )
  };
}

function mapStateToProps (state) {
  return { note: state.notes.note };
}

export default connect(mapStateToProps, { noteDelete })(NoteShow);

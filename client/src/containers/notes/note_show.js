import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { noteDelete } from '../../actions/index';
import { Link } from 'react-router';


class NoteShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  deleteNote() {
    const uid = this.props.auth.uid;
    const nid = this.props.note.id;
    this.props.noteDelete({ uid, nid });
  }

  render() {
    const { note } = this.props;

    if(!note) {
      return <div>Loading...</div>
    }
    console.log( "this is my note :", note)
    return (
      <div>
      <Link to="/dashboard">Back To Dashboard</Link>
      <button
        className="btn btn-danger pull-xs-right"
        onClick={this.deleteNote.bind(this)}>
          Delete Post
      </button>
        <h3>{note.title}</h3>
        <h6>{note.date}</h6>
        <p>{note.content}</p>
      </div>
    )
  };
}

function mapStateToProps (state) {
  return { note: state.notes.note };
}

export default connect(mapStateToProps, { noteDelete })(NoteShow);
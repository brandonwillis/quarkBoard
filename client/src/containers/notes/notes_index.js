import React, { Component } from 'react';
import { connect } from 'react-redux';
import { notesFetch, noteFetch } from '../../actions/index';
import { Link } from 'react-router';
import { dateConverter } from '../../helpers/helperfunctions';

class NotesIndex extends Component {
  componentWillMount() {
    if(this.props.uid !== null){
      this.props.notesFetch(this.props.uid);
    }
  }

  openThisNote(note) {
    this.props.noteFetch(note);
  }

  renderNotes() {
    return this.props.notes.map((note) => {
      return (
        <li className="list-group-item" key={note._id} onClick={this.openThisNote.bind(this, note)}>
          <div>
            <span className="pull-xs-right">{dateConverter(note.date)}</span>
            <h3>{note.title}</h3>
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <ul className="list-group">
          {this.renderNotes()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { notes: state.notes.all, uid: state.auth.uid };
}

export default connect(mapStateToProps, { notesFetch, noteFetch } )(NotesIndex)

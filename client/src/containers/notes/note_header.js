import React, { Component } from 'react';
import { connect } from 'react-redux';
import { noteToggle } from '../../actions/index';
import NoteAdd from './note_add';
import NoteShow from './note_show';
import NoteIndex from './notes_index';

class NoteHeader extends Component {
  renderNoteComponents() {
    if(this.props.display === "add" ) {
      return <NoteAdd />
    }
    if(this.props.display === "show") {
      return <NoteShow />
    }
    return <NoteIndex />
  }

  displayAdd(type) {
    this.props.noteToggle(type);
  }

  render() {
    return (
      <div>
        <div className="rightButton">
          <button className="btn btn-primary" onClick={this.displayAdd.bind(this, "add")}>+</button>
        </div>
        <div>
          <h1>My Notes</h1>
        </div>
        <div>
          {this.renderNoteComponents()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { display: state.notes.display }
}

export default connect(mapStateToProps, { noteToggle })(NoteHeader)

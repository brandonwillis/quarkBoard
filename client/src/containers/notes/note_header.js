import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Collapse, Button } from 'react-bootstrap';
import { noteToggle, noteCollapse } from '../../actions/index';
import NoteAdd from './note_add';
import NoteShow from './note_show';
import NoteIndex from './notes_index';

class NoteHeader extends Component {
  renderNoteComponents() {
    const { display } = this.props;

    if(display === "add") {
      return <NoteAdd />
    }
    if(display === "show") {
      return <NoteShow />
    }
    return <NoteIndex />
  }

  displayAdd(type) {
    this.props.noteToggle(type);
  }

  noteCollapse() {
    event.cancelBubble = true;

    if(event.stopPropagation) {
      event.stopPropagation();
    }

    this.props.noteCollapse(!this.props.expanded);
  }


  render() {
    return (
      <div className="noteBlock">
        <div className="noteHeaderBlock">
          <Button className="btn btn-primary rightButton" onClick={ this.displayAdd.bind(this, "add") }>+</Button>
          <div onClick={ this.noteCollapse.bind(this) }>
            <h1 className="compHeader">Notepad</h1>
          </div>
        </div>
        <Collapse in={ this.props.expanded }>
          { this.renderNoteComponents() }
        </Collapse>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return { display: state.notes.display, expanded: state.notes.expanded };
}

export default connect(mapStateToProps, { noteToggle, noteCollapse })(NoteHeader);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { notesFetch } from '../actions/index';

class NotesIndex extends Component {
  // componentWillMount() {
  //   this.props.notesFetch();
  // }

  renderNotes() {
    return this.props.notes.map((note) => {
      return (
        <li className="list-group-item" key={note.id}>
          <div>
            <span className="pull-xs-right">{note.date}</span>
            <h3>{note.title}</h3>
            <p>{note.body}</p>
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Notes</h3>
        <ul className="list-group">
          {this.renderNotes()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log("Notes state is :", state)
  return { notes: state.notes.all };
}

export default connect(mapStateToProps, { notesFetch })(NotesIndex)

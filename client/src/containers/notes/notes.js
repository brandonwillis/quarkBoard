import React, { Component } from 'react';
import { connect } from 'react-redux';
import { notesFetch } from '../../actions/index';

function dateConverter(date) {
  const newDate = date.slice(0, 10)
  const year = newDate.slice(0,4);
  const month = newDate.slice(5,7);
  const day = newDate.slice(9,10);
  console.log(`${month}/${day}/${year}`);
  return `${month}/${day}/${year}`;
}

class NotesIndex extends Component {

  componentWillMount() {
    if(this.props.uid !== null){
      this.props.notesFetch(this.props.uid);
    }
  }

  renderNotes() {
    return this.props.notes.map((note) => {

      return (
        <li className="list-group-item" key={note.id}>
          <div>
            <span className="pull-xs-right">{dateConverter(note.date)}</span>
            <h3>{note.title}</h3>
          </div>
        </li>
      );
    });
  }

  render() {
    const { notes } = this.props;
    if(!notes) {
      console.log("This is notes props: ", this.props.uid)
      return <div>Loading...</div>
    }
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
  console.log("Notes state is :", state)
  return { notes: state.notes.all, uid: state.auth.uid };
}

export default connect(mapStateToProps, { notesFetch })(NotesIndex)

import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { noteAdd, noteToggle } from '../../actions/index';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';

class NoteAdd extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  onSubmit(formData) {
    const { title, content } = formData;
    const { uid } = this.props;
    const formPackage = ({ uid, title, content });

    this.props.noteAdd(formPackage);
  }

  cancelNote() {
    this.props.noteToggle("index");
  }

  render() {
    const { fields: { title, content}, handleSubmit } = this.props;

    return (
      <div className="addNote">
        <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
          <h3>New Note</h3>
          <div className={ `form-group ${title.touched && title.invalid ? "has-danger" : '' }` }>
            <label>Title</label>
            <input type="text" className="form-control" { ...title } />
            <div className="text-help">
              { title.touched ? title.error : "" }
            </div>
          </div>
          <div className={ `form-group ${ content.touched && content.invalid ? "has-danger" : '' }` }>
            <label>Content</label>
            <textarea type="text" className="form-control" { ...content } />
            <div className="text-help">
              { content.touched ? content.error : "" }
            </div>
          </div>
          <div className="addBtnGroup">
            <Link to="dashboard" className="btn btn-danger leftButton" onClick={ this.cancelNote.bind(this) }>Back To Notes</Link>
            <Button type="submit" className="btn btn-primary rightButton submitBtn">Submit</Button>
          </div>
        </form>
      </div>
    );
  }
};

function validate(values) {
  const errors = {};

  if(!values.title) {
    errors.title = "Don't forget a title";
  }

  if(!values.content) {
    errors.content = "You are missing content";
  }

  return errors;
}

function mapStateToProps(state) {
  return { uid: state.auth.uid };
}

export default reduxForm({
  form: 'NoteAdd',
  fields: ['title', 'content'],
  validate
}, mapStateToProps, { noteAdd, noteToggle })(NoteAdd);

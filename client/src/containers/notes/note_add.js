import React, { Component, PropTypes } from 'React';
import { reduxForm } from 'redux-form';
import { noteAdd } from '../../actions/index';
import { Link } from 'react-router';

class NoteAdd extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  onSubmit(props) {
    this.noteAdd(props);
  }

  render() {
    const { fields: { title, content}, handleSubmit } = this.props;

    console.log("Note add container rendered")
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>New Note</h3>
        <div className={`form-group ${title.touched && title.invalid ? "has-danger" : '' }`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title} />
          <div className="text-help">
            {title.touched ? title.error : ""}
          </div>
        </div>

        <div className={`form-group ${content.touched && content.invalid ? "has-danger" : '' }`}>
          <label>Content</label>
          <textarea type="text" className="form-control" {...content} />
          <div className="text-help">
            {content.touched ? content.error : ""}
          </div>
        </div>
        <Link to="dashboard" className="btn btn-danger">Cancel</Link>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    )
  }
}

function validate(values) {
  const errors = {};
  if(!values.title) {
    errors.title = "Don't forget a title"
  }

  if(!values.contnet) {
    errors.content = "You are missing content"
  }

  return errors;
}

export default reduxForm({
  form: 'NoteAdd',
  fields: ['title', 'content'],
  validate
}, null, { noteAdd })(NoteAdd)

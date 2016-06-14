import React, { Component, PropTypes } from 'React';
import { reduxForm } from 'redux-form';
import { goalAdd } from '../../actions/index';
import { Link } from 'react-router';

class GoalAdd extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  onSubmit(formData) {
    const { goal, dueDate } = formData;
    const uid = this.props.uid;
    const formPackage = ({ uid, goal, dueDate });
    console.log("form data: ", formPackage)
    this.props.goalAdd(formPackage);
  }

  render() {
    const { fields: { goal, dueDate}, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>New Goal</h3>
        <div className={`form-group ${goal.touched && goal.invalid ? "has-danger" : '' }`}>
          <label>Goal</label>
          <input type="text" className="form-control" {...goal} />
          <div className="text-help">
            {goal.touched ? goal.error : ""}
          </div>
        </div>

        <div>
          <label>For</label>
          <div>
            <label>
              <input type="radio" { ...dueDate} value="today" checked={dueDate.value === "today"}/> Today
            </label>
            <label>
              <input type="radio" { ...dueDate} value="week" checked={dueDate.value === "week"}/> This Week
            </label>
          </div>
        </div>
        <Link to="/dashboard" className="btn btn-danger">Cancel</Link>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    )
  }
}

function validate(values) {
  const errors = {};
  if(!values.goal) {
    errors.goal = "Don't forget a goal"
  }

  // if(!values.dueDate) {
  //   errors.dueDate = "You are missing dueDate"
  // }

  return errors;
}

function mapStateToProps(state) {
  return { uid: state.auth.uid };
}

export default reduxForm({
  form: 'GoalAdd',
  fields: ['goal', 'dueDate'],
  validate
}, mapStateToProps, { goalAdd })(GoalAdd)

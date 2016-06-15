import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { goalAdd, goalToggle } from '../../actions/index';
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

  cancelGoal() {
    this.props.goalToggle("today")
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
        <Link to="dashboard" className="btn btn-danger" onClick={this.cancelGoal.bind(this)}>Back To Goals</Link>
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

  return errors;
}

function mapStateToProps(state) {
  return { uid: state.auth.uid, display: state.goals.display };
}

export default reduxForm({
  form: 'GoalAdd',
  fields: ['goal', 'dueDate'],
  validate
}, mapStateToProps, { goalAdd, goalToggle })(GoalAdd)

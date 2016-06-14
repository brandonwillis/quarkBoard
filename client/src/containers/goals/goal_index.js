import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goalsFetch, goalDelete, goalToggle } from '../../actions/index';
import GoalAdd from './goal_add';

class GoalIndex extends Component {
  componentWillMount() {
    if(this.props.uid !== null){
      this.props.goalsFetch(this.props.uid);
    }
  }

  toggleComp(type) {
    this.props.goalToggle(type);
  }

  deleteGoal(goalId) {
    const uid = this.props.uid;
    const gid = goalId;
    this.props.goalDelete({ uid, gid });
  }

  renderGoals(type) {
    console.log("render goal type: ", type)
    return this.props.goals
      .filter((goal) => goal.dueDate === type)
        .map((goal) => {
        return (
          <li className="list-group-item" key={goal._id}>
            <div>
              <button className="btn btn-danger pull-xs-right"
              onClick={this.deleteGoal.bind(this, goal._id)}>
              X
              </button>
              <span>{goal.dueDate}</span>
              <h3>{goal.goal}</h3>
            </div>
          </li>
        );
      });
  }

  render() {
    return (
      <div>
        <button className="btn btn-primary" onClick={this.toggleComp.bind(this, "today")}>Today</button>
        <button className="btn btn-primary" onClick={this.toggleComp.bind(this, "week")}>This Week</button>
        <div>
          <ul className="list-group">
            {this.renderGoals(this.props.show)}
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { goals: state.goals.all , show: state.goals.show, uid: state.auth.uid }
}

export default connect(mapStateToProps, { goalsFetch, goalToggle, goalDelete })(GoalIndex)

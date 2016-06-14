import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goalsFetch, goalDelete } from '../../actions/index';
import GoalAdd from './goal_add';

class GoalIndex extends Component {
  componentWillMount() {
    if(this.props.uid !== null){
      this.props.goalsFetch(this.props.uid);
    }
  }

  deleteGoal(goalId) {
    const uid = this.props.uid;
    const gid = goalId;
    this.props.goalDelete({ uid, gid });
  }

  renderGoals() {
    return this.props.goals.map((goal) => {
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
        <div className="text-xs-right">
          <button className="btn btn-primary">+</button>
        </div>
        <div>
          <h1>Goal holder</h1>
          <button className="btn btn-primary">Today</button>
          <button className="btn btn-primary">This Week</button>
        </div>
        <div>
          <ul className="list-group">
            {this.renderGoals()}
          </ul>
        </div>
        <GoalAdd />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { goals: state.goals.all , uid: state.auth.uid }
}

export default connect(mapStateToProps, { goalsFetch, goalDelete })(GoalIndex)

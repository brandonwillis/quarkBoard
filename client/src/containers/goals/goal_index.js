import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goalsFetch, goalDelete, goalToggle } from '../../actions/index';
import GoalAdd from './goal_add';
import { Button } from 'react-bootstrap';

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
    return this.props.goals
      .filter((goal) => goal.dueDate === type)
        .map((goal) => {
        return (
          <li className="list-group-item goalListItem" key={goal._id}>
            <div>
              <Button className="btn deleteBtn rightButton" onClick={this.deleteGoal.bind(this, goal._id)}>X</Button>
              <h4>{goal.goal}</h4>
            </div>
          </li>
        );
      });
  }

  render() {
    return (
      <div>
          <Button className="btn goalBtn" onClick={this.toggleComp.bind(this, "today")}>Today</Button>
          <Button className="btn goalBtn" onClick={this.toggleComp.bind(this, "week")}>This Week</Button>
        <ul className="list-group goalList">
          {this.renderGoals(this.props.display)}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { goals: state.goals.all , display: state.goals.display, uid: state.auth.uid }
}

export default connect(mapStateToProps, { goalsFetch, goalToggle, goalDelete })(GoalIndex)

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goalToggle } from '../../actions/index';
import GoalAdd from './goal_add';
import GoalIndex from './goal_index';

class GoalHeader extends Component {
  renderGoalComponents() {
    if(this.props.display === "add" ) {
      return <GoalAdd />
    }
    return <GoalIndex />
  }

  displayAdd(type) {
    this.props.goalToggle(type);
  }

  render() {
    return (
      <div>
        <div className="rightButton">
          <button className="btn btn-primary" onClick={this.displayAdd.bind(this, "add")}>+</button>
        </div>
        <div>
          <h1>My Goals</h1>
        </div>
          {this.renderGoalComponents()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { display: state.goals.display };
}

export default connect(mapStateToProps, { goalToggle })(GoalHeader)

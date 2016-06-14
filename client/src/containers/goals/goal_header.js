import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goalToggle } from '../../actions/index';
import GoalAdd from './goal_add';
import GoalIndex from './goal_index';

class GoalHeader extends Component {
  renderGoalComponents() {
    if(this.props.show === "add" ) {
      return <GoalAdd />
    }
    return <GoalIndex />
  }

  showAdd(type) {
    this.props.goalToggle(type);
  }

  render() {
    console.log("goal header props :", this.props)
    return (
      <div>
        <div className="text-xs-right">
          <button className="btn btn-primary" onClick={this.showAdd.bind(this, "add")}>+</button>
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
  return { show: state.goals.show }
}

export default connect(mapStateToProps, { goalToggle })(GoalHeader)

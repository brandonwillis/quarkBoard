import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Collapse } from 'react-bootstrap';
import { goalToggle, goalCollapse } from '../../actions/index';
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

  goalCollapse() {
    console.log("note collapsing: ", this.props.expanded);
    event.cancelBubble = true;
    if(event.stopPropagation) {
      event.stopPropagation();
    }
    this.props.goalCollapse(!this.props.expanded);
  }

  render() {
    return (
      <div className="goalBlock">
        <div className="goalParent">
          <button className="btn btn-primary rightButton" onClick={this.displayAdd.bind(this, "add")}>+</button>
          <div onClick={this.goalCollapse.bind(this)}>
            <h1 className="compHeader">My Goals</h1>
          </div>
          <Collapse in={this.props.expanded}>
            {this.renderGoalComponents()}
          </Collapse>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { display: state.goals.display, expanded: state.goals.expanded };
}

export default connect(mapStateToProps, { goalToggle, goalCollapse })(GoalHeader)

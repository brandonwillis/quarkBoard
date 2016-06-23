import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Collapse } from 'react-bootstrap';
import { goalToggle, goalCollapse } from '../../actions/index';
import GoalAdd from './goal_add';
import GoalIndex from './goal_index';
import { Button } from 'react-bootstrap';

class GoalHeader extends Component {
  renderGoalComponents() {
    if(this.props.display === "add") {
      return <GoalAdd />;
    }

    return <GoalIndex />;
  }

  displayAdd(type) {
    this.props.goalToggle(type);
  }

  goalCollapse() {
    event.cancelBubble = true;
    if(event.stopPropagation) {
      event.stopPropagation();
    }

    this.props.goalCollapse(!this.props.expanded);
  }

  render() {
    const { expanded } = this.props;

    return (
      <div className="goalBlock">
        <div className="goalParent">
          <Button className="btn btn-primary rightButton" onClick={ this.displayAdd.bind(this, "add") }>+</Button>
          <div onClick={ this.goalCollapse.bind(this) }>
            <h1 className="compHeader">My Goals</h1>
          </div>
          <Collapse in={ expanded }>
            { this.renderGoalComponents() }
          </Collapse>
        </div>
      </div>
    )
  }
};

function mapStateToProps(state) {
  return { display: state.goals.display, expanded: state.goals.expanded };
}

export default connect(mapStateToProps, { goalToggle, goalCollapse })(GoalHeader);

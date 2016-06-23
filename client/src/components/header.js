import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class Header extends Component {
  authButton(){
    if (this.props.auth.isAuth) {
      return (
        <div className="signOutBtn" onClick={ () => this.props.signOut() }>
          <Link to="/">Sign Out</Link>
        </div>
      );
    }

    return (
      <div className="signOutBtn">
        <Link to="/">Sign In</Link>
      </div>
    );
  }

  render() {
    return (
      <div className="headerParent">
        <p className="headerStyle">QuarkBoard</p>
        <div className="signOutBtn">
          { this.authButton() }
        </div>
      </div>
    )
  };
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps, actions)(Header);

import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class Header extends Component {
  authButton(){
    if (this.props.auth.isAuth) {
      return <Link to="/" className="btn btn-primary" onClick={() => this.props.signOut()}>Sign Out</Link>
    }
    return <Link to="/" className="btn btn-primary rightButton">Sign In</Link>;
  }

  render() {
    return (
      <div className="headerParent">
        <h1 className="headerStyle">QuarkBoard</h1>
        <div className="rightButton">
          {this.authButton()}
        </div>
      </div>
    )
  };
}

function mapStateToProps(state) {
  return { auth: state.auth }
}

export default connect(mapStateToProps, actions)(Header);

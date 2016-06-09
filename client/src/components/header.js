import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class Header extends Component {
  authButton(){
    if (this.props.auth.isAuth) {
      return <Link to="/" className="btn btn-primary" onClick={() => this.props.signOutUser()}>Sign Out</Link>
    }
    return <Link to="/" className="btn btn-primary">Sign In</Link>;
  }

  render() {
    return (
      <nav className="navbar navbar-light">
        <ul className="nav navbar-nav">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="nav-item">
            {this.authButton()}
          </li>
        </ul>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return { auth: state.auth }
}

export default connect(mapStateToProps, actions)(Header);

import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { PageHeader } from 'react-bootstrap';

class Header extends Component {
  authButton(){
    if (this.props.auth.isAuth) {
      return <Link to="/" className="btn btn-primary" onClick={() => this.props.signOut()}>Sign Out</Link>
    }
    return <Link to="/" className="btn btn-primary">Sign In</Link>;
  }

  render() {
    return (
      <PageHeader className="headerStyle">
        QuarkBoard
        <div className="authButton">
        {this.authButton()}
        </div>
      </PageHeader>
    )
  }
}

function mapStateToProps(state) {
  return { auth: state.auth }
}

export default connect(mapStateToProps, actions)(Header);

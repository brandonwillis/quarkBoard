import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object
    }

    componentWillMount() {
      if(!this.props.auth.isAuth) {
        this.context.router.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if(!nextProps.auth.isAuth) {
        this.context.router.push('/');
      }
    }

    render(){
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { auth: state.auth };
  }

  return connect(mapStateToProps)(Authentication);
}

import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { signIn } from '../../actions/index';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';

class SignIn extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  onSubmit(props) {
    this.props.signIn(props);
  }

  render() {
    const { fields: { username, password }, handleSubmit } = this.props;

    return (
      <div className="authBlock">
        <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
          <p className="authHeader">Sign In</p>
          <div className={ `form-group ${ username.touched && username.invalid ? "has-danger" : '' }` }>
            <label>Username</label>
            <input type="text" className="form-control" { ...username } />
            <div className="text-help authError">
              <p>{ username.touched ? username.error : "" }</p>
            </div>
          </div>
          <div className={ `form-group ${ password.touched && password.invalid ? "has-danger" : '' }` }>
            <label>Password</label>
            <input type="password" className="form-control" { ...password } />
            <div className="text-help authError">
              <p>{ password.touched ? password.error : "" }</p>
            </div>
          </div>
          <div className="authBtnGroup">
            <Button type="submit" className="btn btn-primary">Sign In</Button>
            <Link to="signup" className="btn btn-primary signUpBtn">Sign Up</Link>
          </div>
        </form>
      </div>
    )
  };
}

function validate(values) {
  const errors = {};
  if(!values.username) {
    errors.username = "Enter a username";
  }

  if(!values.password) {
    errors.password = "Enter a password";
  }

  return errors;
}

function mapStateToProps(state) {
  return { uid: state.auth.uid };
}

export default reduxForm({
  form: 'SignInForm',
  fields: ['username','password'],
  validate
}, mapStateToProps, { signIn })(SignIn);

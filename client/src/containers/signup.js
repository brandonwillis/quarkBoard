import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { signUp } from '../actions/index';
import { Link } from 'react-router';

class SignUp extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  onSubmit(props) {
    console.log("Sign Up props: ", props)
    this.props.signUp(props);
  }

  render() {
    const { fields: { username, email, password, confirmPassword}, handleSubmit } = this.props

    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <h3>Sign Up</h3>
        <div className={`form-group ${username.touched && username.invalid ? "has-danger" : '' }`}>
          <label>Username</label>
          <input type="text" className="form-control" {...username} />
          <div className="text-help">
            {username.touched ? username.error : ""}
          </div>
        </div>
        <div className={`form-group ${email.touched && email.invalid ? "has-danger" : '' }`}>
          <label>Email Address</label>
          <input type="text" className="form-control" {...email} />
          <div className="text-help">
            {email.touched ? email.error : ""}
          </div>
        </div>
        <div className={`form-group ${password.touched && password.invalid ? "has-danger" : '' }`}>
          <label>Password</label>
          <input type="password" className="form-control" {...password} />
          <div className="text-help">
            {password.touched ? password.error : ""}
          </div>
        </div>
        <div className={`form-group ${confirmPassword.touched && confirmPassword.invalid ? "has-danger" : '' }`}>
          <label>Confirm Password</label>
          <input type="password" className="form-control" {...confirmPassword} />
          <div className="text-help">
            {confirmPassword.touched ? confirmPassword.error : ""}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Sign In</button>
        <Link to="/signup" className="btn btn-danger">Sign Up</Link>
      </form>
    )
  };
}

function validate(values) {
  const errors = {};
  if(!values.username) {
    errors.username = "Enter a Username"
  }

  if(!values.email) {
    errors.email = "Enter a valid email address"
  }
  if(!values.password) {
    errors.password = "Enter a password"
  }
  if(!values.confirmPassword) {
    errors.confirmPassword = "Reenter your password"
  }
  if(values.password !== values.confirmPassword) {
    errors.confirmPassword = "Your passwords do not match"
  }

  return errors;
}

export default reduxForm({
  form: 'SignUpForm',
  fields: ['username', 'email', 'password', 'confirmPassword'],
  validate
}, null, { signUp })(SignUp)

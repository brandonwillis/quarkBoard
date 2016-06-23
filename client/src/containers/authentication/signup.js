import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { signUp } from '../../actions/index';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';

class SignUp extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  onSubmit(props) {
    this.props.signUp(props);
  }

  render() {
    const { fields: { username, email, password, confirmPassword}, handleSubmit } = this.props;

    return (
      <div className="authBlock">
        <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
          <p className="authHeader">Sign Up</p>
          <div className={ `form-group ${ username.touched && username.invalid ? "has-danger" : '' }` }>
            <label>Username</label>
            <input type="text" className="form-control" { ...username } />
            <div className="text-help authError">
              <p>{ username.touched ? username.error : "" }</p>
            </div>
          </div>
          <div className={ `form-group ${ email.touched && email.invalid ? "has-danger" : '' }` }>
            <label>Email Address</label>
            <input type="text" className="form-control" { ...email } />
            <div className="text-help authError">
              <p>{ email.touched ? email.error : "" }</p>
            </div>
          </div>
          <div className={ `form-group ${ password.touched && password.invalid ? "has-danger" : '' }` }>
            <label>Password</label>
            <input type="password" className="form-control" { ...password } />
            <div className="text-help authError">
              <p>{ password.touched ? password.error : "" }</p>
            </div>
          </div>
          <div className={ `form-group ${ confirmPassword.touched && confirmPassword.invalid ? "has-danger" : '' }` }>
            <label>Confirm Password</label>
            <input type="password" className="form-control" { ...confirmPassword } />
            <div className="text-help authError">
              { confirmPassword.touched ? confirmPassword.error : "" }
            </div>
          </div>
          <div className="authBtnGroup">
            <Link to="/" className="btn btn-danger">Cancel</Link>
            <Button type="submit" className="btn btn-primary signUpBtn">Sign Up</Button>
          </div>
        </form>
      </div>
    );
  }
};

function validate(values) {
  const errors = {};
  if(!values.username) {
    errors.username = "Enter a Username";
  }

  if(!values.email) {
    errors.email = "Enter a valid email address";
  }
  if(!values.password) {
    errors.password = "Enter a password";
  }
  if(!values.confirmPassword) {
    errors.confirmPassword = "Re-enter your password";
  }
  if(values.password !== values.confirmPassword) {
    errors.confirmPassword = "Your passwords do not match";
  }

  return errors;
}

export default reduxForm({
  form: 'SignUpForm',
  fields: ['username', 'email', 'password', 'confirmPassword'],
  validate
}, null, { signUp })(SignUp);

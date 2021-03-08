import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import SocialLoginComponent from "../../components/SocialLogin/index";

import './index.css'

class Login extends Component{
  render() {
    if (this.props.isAuthenticated) {
    return <Redirect to="/" />
  }
    return (
      <div className="login-container">
        <div className="login-logo">
          <strong>ANNOTATION WEB GAME</strong>
        </div>
        <div className="login-button">
          <SocialLoginComponent/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated
});

export default withRouter(connect(mapStateToProps, null)(Login));

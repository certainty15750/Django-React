import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SocialButton from './SocialButton'
import * as routes from '../../constants/routes';
import { createUser } from '../../actions/ChildrenApi';
import * as authActions from '../../actions/actionTypes';

class SocialLoginComponent extends React.Component{
  constructor(props){
    super(props);
    this.responseGoogle=this.responseGoogle.bind(this);
    this.responseGoogleError=this.responseGoogleError.bind(this);
  }

  responseGoogle = (response) => {
    console.log("\n>>>======>>>>> google response\n"+JSON.stringify(response));
    if (response._profile) {
      const credentials = {
        username: response._profile.name,
        email: response._profile.email
      };
      this.submit(credentials);
    }
  };
  responseGoogleError = (response) => {
    console.log("\n>>>======>>>>>error\n"+JSON.stringify(response));
  };

  submit(credentials) {
    this.props.createUser(credentials).then((resp) => {
      this.props.authLogin(resp.token);
      this.props.history.push(routes.TASK_PANEL);
    })
  }

  render(){
    return(
      <div>
        <SocialButton
          provider='google'
          className="googleButton"
          appId='604123067341-cl1esk1cel29uj5llj7e3omu508s9k5g.apps.googleusercontent.com'
          onLoginSuccess={this.responseGoogle}
          onLoginFailure={this.responseGoogle}
          prompt="select_account"
          redirectUri="http://localhost:3000/"
        >
        </SocialButton>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated
});

const mapDispatchToProps = (dispatch) => ({
  createUser: (credentials) => createUser(credentials),
  authLogin: (accessToken) => dispatch(authActions.authLogin(accessToken))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SocialLoginComponent));

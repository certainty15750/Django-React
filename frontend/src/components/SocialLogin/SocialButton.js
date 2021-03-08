import React from 'react'
import { GoogleLoginButton  } from "react-social-login-buttons";
import SocialLogin from 'react-social-login'

const Button = ({ children, triggerLogin, ...props }) => (
  <GoogleLoginButton onClick={triggerLogin} {...props}>
    { children }
  </GoogleLoginButton >
)

export default SocialLogin(Button)
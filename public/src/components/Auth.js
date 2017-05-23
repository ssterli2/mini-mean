import { Route, Redirect } from 'react-router-dom'
import React from 'react';
import axios from 'axios';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {logged_in: false, login_pending: true};
    axios.post('/check_login').then(data => {
      this.setState({
        ...this.state,
        logged_in: data.data.logged_in,
        login_pending: false
      });
    })
    .catch( err => {
    });
  }

  render() {
    if (this.state.login_pending) {
      return null;
    } else {
      if (!this.state.logged_in) {
        return (
          <Redirect to="/login" />
        );
      } else {
        return this.actualRender();
      }
    }
  }
}

export default Auth;

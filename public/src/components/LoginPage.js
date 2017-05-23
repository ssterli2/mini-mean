import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import Login from './Login';
import Reg from './Reg';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {errors: [], redirect: false};

    this.regUser = this.regUser.bind(this);
    this.login = this.login.bind(this);
  }

  regUser(data) {
    axios.post('/users', data).then(data => {
      this.setState({ ...this.state, redirect: true })
    })
    .catch( err => {
      var errors = this.state.errors.slice();
      for (var i = 0; i < err.response.data.length; i++) {
        console.log(err.response.data[i]);
        errors.push(<p>{err.response.data[i]}</p>);
      }
      this.setState({
        ...this.state,
        errors: errors
      });
    });
  }

  login(data) {
    axios.post('/users/login', data).then(data => {
      this.setState({ ...this.state, redirect: true })
    })
    .catch( err => {
      console.log('catch errors');
      var errors = this.state.errors.slice();
      errors.push(<p>{err.response.data.error}</p>);
      this.setState({
        ...this.state,
        errors: errors
      });
    });
  }

  render() {

    if (this.state.redirect) {
      console.log('redirect?');
      return (
        <Redirect to="/" />
      )
    }
    console.log('no redirect');
    return (
      <div>
        <h1>Login/Register</h1>
        {this.state.errors}
        <Reg regUser = {this.regUser}/>
        <Login login = {this.login}/>
      </div>
    )
  }
}

export default LoginPage;

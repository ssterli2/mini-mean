import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Auth from './Auth';
import { Link } from 'react-router-dom'

class Dash extends Auth {
  constructor(props) {
    super(props);
    this.setState({ ...this.state});

    this.logout = this.logout.bind(this);
  }

  logout() {
    console.log(this.state);
    axios.post('/logout').then(data => {
      console.log('success');
      this.setState({ ...this.state, logged_in: false })
    })
    .catch( err => {
      console.log(err);
    });
  }

  render() {
    return (
      <div>
        <Link to="/products">Products</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/customers">Customers</Link>
        <a href='' onClick={this.logout}>Logout</a>
      </div>
    )
  }
}

export default Dash;

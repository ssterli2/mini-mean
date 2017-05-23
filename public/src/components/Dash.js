import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Auth from './Auth';
import { Link } from 'react-router-dom'

import Nav from './Nav';

class Dash extends Auth {
  constructor(props) {
    super(props);
    this.setState({ ...this.state, 'orders': [], 'products': [], 'users': [], 'user': ''});

  }

  componentDidMount() {
    axios.get('/dash').then(data => {
      console.log(data.data);
      this.setState({
        ...this.state,
        orders: data.data.orders,
        products: data.data.products,
        users: data.data.users,
        user: data.data.user
      });
      })
      .catch( err => {
        console.log(err);
    });
  }

  actualRender() {
    if (this.state.login_pending) {
      return null
    } else {
      console.log('getting orders');
      console.log(this.state.orders);
        var orders = [];
        for (var i = 0; i < this.state.orders.length; i++) {
          console.log(this.state.orders[i]);
          orders.push(<p>{this.state.orders[i].name} purchased {this.state.orders[i].quantity} {this.state.orders[i].products}...({this.state.orders[i].createdAt})</p>)
        }

        var products = [];
        for (var i = 0; i < this.state.products.length; i++) {
          products.push(<div><p>{this.state.products[i].product}</p><p>{this.state.products[i].description}</p><p>{this.state.products[i].quantity}</p></div>)
        }

        var users = [];
        for (var i = 0; i < this.state.users.length; i++) {
          console.log('users');
          console.log(this.state.users[i]);
          users.push(<p>{this.state.users[i].first_name} {this.state.users[i].last_name} joined the store. ({this.state.users[i].createdAt})</p>)
        }
      }
    return (
      <div>
        <Nav />
        <h2>Welcome {this.state.user.first_name}!</h2>
        <div>
          {products}
          <Link to="/products">Show all products</Link>
        </div>
        <div>
          {orders}
          <Link to="/orders">Show all orders</Link>
        </div>
        <div>
          {users}
          <Link to="/customers">Show all customers</Link>
        </div>
      </div>
    )
  }
}

export default Dash;

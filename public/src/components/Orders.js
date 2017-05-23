import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Auth from './Auth';

import Nav from './Nav';

class Orders extends Auth {
  constructor(props) {
    super(props);
    this.setState({ ...this.state, 'orders': [], 'products': [], 'user': '', 'quantity': 0, 'product': ''});

    this.handleChange = this.handleChange.bind(this);
    this.addOrder = this.addOrder.bind(this);
  }

  componentDidMount() {
    axios.get('/orders').then(data => {
      this.setState({
        ...this.state,
        orders: data.data.orders,
        products: data.data.products,
        user: data.data.user.first_name
      });
      })
      .catch( err => {
        console.log(err);
    });
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  addOrder(event) {
    var data = this.state;
    axios.post('/new_order', data).then(data => {
      var orders = this.state.orders.slice();
      orders.push({ data });
      this.setState({
        ...this.state,
        orders: orders
      });
    })
    .catch( err => {
      console.log(err);
    });
  }

  actualRender() {
    var orders = [];
    for (var i = 0; i < this.state.orders.length; i++) {
      orders.push(<tr><td>{this.state.orders[i].name}</td><td>{this.state.orders[i].product}</td><td>{this.state.orders[i].quantity}</td><td>{this.state.orders[i].createdAt}</td></tr>)
    }

    var products = [];
    for (var i = 0; i < this.state.products.length; i++) {
      console.log(this.state.products[i]);
      products.push(<option value={this.state.products[i]._id}>{this.state.products[i].product}</option>);
    }
    return (
      <div>
        <Nav />
        <h2>Welcome {this.state.user.first_name}!</h2>
        <form onSubmit={this.addOrder} method='post'>
          Product:<select  name='product' value={this.state.product} onChange={this.handleChange}>{products}</select>
          Quantity<input type='number' name='quantity' value={this.state.quantity} onChange={this.handleChange} />
          <input type='submit' value='Make an order' />
        </form>
        <div>
          <table>
            <tr>
              <th>Customer Name</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Date Ordered</th>
            </tr>
            {orders}
          </table>
        </div>
      </div>
    )
  }
}

export default Orders;

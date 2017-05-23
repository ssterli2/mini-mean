import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Auth from './Auth';

import Nav from './Nav';

class Products extends Auth {
  constructor(props) {
    super(props);
    this.setState({ ...this.state, 'products': [], 'user': '', 'product': '', 'description': '', 'quantity': 0, 'search': ''});

    this.handleChange = this.handleChange.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.searchProduct = this.searchProduct.bind(this);
  }

  componentDidMount() {
    axios.get('/products').then(data => {
      this.setState({
        ...this.state,
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

  addProduct(event) {
    event.preventDefault();
    event.stopPropagation();
    var data = this.state;
    axios.post('/new_product', data).then(data => {
      var products = this.state.products.slice();
      products.push({ data });
      this.setState({
        ...this.state,
        products: products
      });
    })
    .catch( err => {
      console.log(err);
    });
  }

  removeProduct(event) {
    event.preventDefault();
    console.log(event.target.value);
    var input = {'id': this.state.products[event.target.value]._id, 'index': event.target.value};
    axios.post('/remove_product', input).then(data => {
      console.log(input.index);
      var newProducts = this.state.products.slice();
      newProducts.splice(input.index, 1);
      console.log(newProducts);
      this.setState({
        ...this.state,
        products: newProducts
      });
    })
    .catch( err => {
      console.log(err);
    });
  }

  searchProduct(event) {
    event.preventDefault();
    event.stopPropagation();
    var data = {'search': this.state.search};
    axios.post('/search_product', data).then(data => {
      this.setState({
        ...this.state,
        products: data.data
      });
    })
    .catch( err => {
      console.log(err);
    });
  }

  actualRender() {
    var products = [];
    for (var i = 0; i < this.state.products.length; i++) {
      products.push(<div ref={this.state.products[i]._id}><p>{this.state.products[i].product}</p><p>{this.state.products[i].description}</p><p>{this.state.products[i].quantity}</p><button value={i} onClick={this.removeProduct}>Remove</button></div>)
    }

    return (
      <div>
        <Nav />
        <h2>Welcome {this.state.user.first_name}!</h2>
        <form onSubmit={this.searchProduct} method='post'>
          <input type='text' name='search' value={this.state.search} onChange={this.handleChange} />
          <input type='submit' value='Search' />
        </form>
        <form onSubmit={this.addProduct} method='post'>
          Name:<input type='text' name='product' value={this.state.product} onChange={this.handleChange} />
          Description:<input type='text' name='description' value={this.state.description} onChange={this.handleChange} />
          Quantity<input type='number' name='quantity' value={this.state.quantity} onChange={this.handleChange} />
        <input type='submit' value='Make a product' />
        </form>
        {products}
      </div>
    )
  }
}

export default Products;

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import './extend';
import axios from 'axios';
import { BrowserRouter, Route, Link } from 'react-router-dom'

import LoginPage from './components/LoginPage';
import Dash from './components/Dash';
import Orders from './components/Orders';
import Products from './components/Products';
import Customers from './components/Customers';

class Root extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Dash}/>
          <Route exact path="/login" component={LoginPage}/>
          <Route exact path="/products" component={Products}/>
          <Route exact path="/orders" component={Orders}/>
          <Route exact path="/customers" component={Customers}/>
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Auth from './Auth';

import Nav from './Nav';

class Customers extends Auth {
  constructor(props) {
    super(props);
    this.setState({ ...this.state, 'users': [], 'user': ''});

  }

  componentDidMount() {
    axios.get('/all_customers').then(data => {
      this.setState({
        ...this.state,
        users: data.data.users,
        user: data.data.user
      });
      })
      .catch( err => {
        console.log(err);
    });
  }

  actualRender() {
    var users = [];
    for (var i = 0; i < this.state.users.length; i++) {
      users.push(<tr><td>{this.state.users[i].first_name} {this.state.users[i].last_name}</td><td>{this.state.users[i].birthday}</td></tr>)
    }

    return (
      <div>
        <Nav />
        <h2>Welcome {this.state.user.first_name}!</h2>
        <div>
          <table>
            <tr>
              <th>Customer Name</th>
              <th>Birthday</th>
            </tr>
            {users}
          </table>
        </div>
      </div>
    )
  }
}

export default Customers;

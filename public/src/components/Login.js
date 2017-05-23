import React from 'react';
import ReactDOM from 'react-dom';
import Validation from 'react-validation'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { login_email: '', login_password: '' };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.login(this.state);
  }

  render() {
    return (
      <div className="form">
        <Validation.components.Form ref={c => this.form = c} onSubmit={this.onSubmit}>
          Email:<Validation.components.Input errorClassName='is-invalid-input' type="text" containerClassName='' value={this.state.login_email} onChange={this.handleChange} name='login_email' validations={['required', 'email']}/>
          Password:<Validation.components.Input errorClassName='is-invalid-input' type="password" containerClassName='' value={this.state.login_password} onChange={this.handleChange} name='login_password' validations={['required']}/>
          <Validation.components.Button className='button' errorClassName='asd'>Submit</Validation.components.Button>
        </Validation.components.Form>
        <div className="validation">
        </div>
      </div>
    )
  }
}

export default Login;

import React from 'react';
import ReactDOM from 'react-dom';
import Validation from 'react-validation'

class Reg extends React.Component {
  constructor(props) {
    super(props);
    this.state = { first_name: '', last_name: '', email: '', birthday: '', password: '', confirm_pass: '' };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  onSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    this.props.regUser(this.state);
  }

  render() {
    return (
      <div className="form">
        <Validation.components.Form ref={c => this.form = c} onSubmit={this.onSubmit}>

          First Name:<Validation.components.Input errorClassName='is-invalid-input' type="text" containerClassName='' value={this.state.first_name} onChange={this.handleChange} name='first_name' validations={['required', 'minlength_name', 'alpha']}/>

          Last Name:<Validation.components.Input errorClassName='is-invalid-input' type="text" containerClassName='' value={this.state.last_name} onChange={this.handleChange} name='last_name' validations={['required', 'minlength_name', 'alpha']}/>

          Email:<Validation.components.Input errorClassName='is-invalid-input' type="text" containerClassName='' value={this.state.email} onChange={this.handleChange} name='email' validations={['required', 'email']}/>

          Birthday:<Validation.components.Input errorClassName='is-invalid-input' type="date" containerClassName='' value={this.state.birthday} onChange={this.handleChange} name='birthday' validations={['required']}/>

          Password:<Validation.components.Input errorClassName='is-invalid-input' type="password" containerClassName='' value={this.state.password} onChange={this.handleChange} name='password' validations={['required', 'password', 'passwords_equal']}/>

          Confirm Password:<Validation.components.Input errorClassName='is-invalid-input' type="password" containerClassName='' value={this.state.confirm_pass} onChange={this.handleChange} name='confirm_pass' validations={['required', 'passwords_equal']}/>

          <Validation.components.Button className='button' errorClassName='asd'>Submit</Validation.components.Button>

        </Validation.components.Form>
        <div className="validation">
        </div>
      </div>
    )
  }
}

export default Reg;

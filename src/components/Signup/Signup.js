import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import API from "../../utils/API";
import Select from 'react-select';

const options = [
  { value: 'ROLE_USER', label: 'USER' },
  { value: 'ROLE_ADMIN', label: 'ADMIN' }
];

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const validateForm = (errors) => {
  console.log(errors)
  let valid = true;
  Object.values(errors).forEach(
    // if we have an error string set valid to false
    (val) => val.length > 0 && (valid = false)
  );

  return valid;
}

export class Signup extends React.Component {
  state = {
    email: "",
    password: "",
    confirmpassword: "", 
    name: "",
    avatar: "",
    role: "ROLE_USER",
    forminValid: false,
    // apiRes: "",
    // selectedOption: null
    errors: {
      name: '',
      email: '',
      password: '',
      confirmpassword: "",
      apiRes: ""
    }
  };
  send = async (e) => {
    e.preventDefault();
    const { email, password, confirmpassword, name, avatar, role, errors } = this.state;
    errors.name= '';
    errors.email= '';
    errors.password= '';
    errors.confirmpassword= '';
    errors.apiRes= '';

    if (!email || email.length === 0) {
      errors.email = "Veillez renseigner votre adresse email";
    }

    if (!password || password.length === 0) {
      errors.password = "Veillez renseigner votre mot de passe";
    }

    if (!confirmpassword || confirmpassword.length === 0) {
      errors.confirmpassword = "Veillez renseigner votre confirmation de mot de passe";
    }

    if (!name || name.length === 0) {
      errors.name = "Veillez renseigner votre nom";
    }

    this.setState({errors: errors});

    if (!validateForm(this.state.errors)) {
      return;
    }

    try {
      const data = await API.signup({ email, password, name, avatar, role });
      
      // Warning: data.code not necessarily defined
      if (data.code && data.code != 200) {
        errors.apiRes = data.message;
        this.setState({errors: errors});
        // console.log(this.state);
        return;
      }

      localStorage.setItem("token", data.tokens[0].token);
      // localStorage.setItem("userId", data.id);
      window.location = "/dashboard";
    } catch (error) {
      console.error(error);
    }
  };
  handleChange = (event) => {
    const { id, value } = event.target;
    let errors = this.state.errors;
    switch (id) {
      case 'email': 
        errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
      case 'password': 
        errors.password = 
          value.length < 4
            ? 'Password must be 4 characters long!'
            : '';
        break;
      case 'confirmpassword': 
        errors.confirmpassword = 
          value !== this.state.password
            ? "Passwords don't match!"
            : '';
        break;
      case 'name': 
        errors.name = 
          value.length < 4
            ? 'name must be 4 characters long!'
            : '';
        break;
      default:
        break;
    }
    
    this.setState({errors, [id]: value});
    // console.log(this.state)
    // this.setState({
    //   [event.target.id]: event.target.value
    // });
  };
  handleSelectChange = (selectedOption) => {
    // this.setState( {selectedOption: selectedOption.value} );
    this.setState( {role: selectedOption.value} );
    // console.log(`Option selected:`, selectedOption);
    // console.log(this.state);
  };
  handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm(this.state.errors)) {
      console.info('Valid Form')
    } else {
      console.error('Invalid Form')
    }
  };
  render() {
    // const { email, password, confirmpassword, name, avatar, selectedOption } = this.state;
    // const { email, password, confirmpassword, name, avatar, role, errors, forminValid, apiRes } = this.state;
    const { email, password, confirmpassword, name, avatar, role, errors, forminValid } = this.state;
    // console.log(this.state)
    // Object.keys(errors).map((field, index) => {
    //   if (!errors[field].length > 0) {
    //     this.state.forminValid = false;
    //   }
    // })

    return (
      <div className="Signup">
        {errors.email.length > 0 && 
          <span className='error'>{errors.email}<br /></span>}
        {errors.password.length > 0 && 
          <span className='error'>{errors.password}<br /></span>}
        {errors.confirmpassword.length > 0  && 
          <span className='error'>{errors.confirmpassword}<br /></span>}
        {errors.name.length > 0 && 
          <span className='error'>{errors.name}<br /></span>}
         {errors.apiRes.length > 0 && 
          <span className='error'>{errors.apiRes}<br /></span>}
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={this.handleChange}
            placeholder="name@example.com"
            required
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={password}
            onChange={this.handleChange}
            type="password"
            placeholder="Enter password"
            required
          />
        </FormGroup>
        <FormGroup controlId="confirmpassword" bsSize="large">
          <ControlLabel>Confirmation Password</ControlLabel>
          <FormControl
            value={confirmpassword}
            onChange={this.handleChange}
            type="password"
            placeholder="Enter confirmation password"
          />
        </FormGroup>
        <FormGroup controlId="name" bsSize="large">
          <ControlLabel>Name</ControlLabel>
          <FormControl
            value={name}
            onChange={this.handleChange}
            type="text"
            placeholder="Enter name"
          />
        </FormGroup>
        <FormGroup controlId="avatar" bsSize="large">
          <ControlLabel>Avatar</ControlLabel>
          <FormControl
            value={avatar}
            onChange={this.handleChange}
            type="text"
            placeholder="Enter avatar url"
          />
        </FormGroup>
        <FormGroup controlId="role" bsSize="large">
          <ControlLabel>Rôle</ControlLabel>
          <Select options = {options} onChange={this.handleSelectChange} autoFocus={true} defaultValue={{ label: "USER", value: "ROLE_USER" }} />
        </FormGroup>
        <Button onClick={this.send} block bsSize="large" type="submit" disabled={forminValid}>
        {/* <Button onClick={this.handleSubmit} block bsSize="large" type="submit"> */}
          Inscription
        </Button>
      </div>
    );
  }
}
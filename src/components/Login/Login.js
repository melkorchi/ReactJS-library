import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import API from "../../utils/API";

export class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errors: {
      email: '',
      password: '',
      apiRes: ''
    }
  };
  send = async (e) => {
    e.preventDefault();
    const { email, password, errors } = this.state;

    errors.email= '';
    errors.password= '';
    errors.apiRes= '';

    if (!email || email.length === 0) {
      errors.email = "Veillez renseigner votre adresse email";
    }

    if (!password || password.length === 0) {
      errors.password = "Veillez renseigner votre mot de passe";
    }

    this.setState({errors: errors});

    try {
      const data  = await API.login(email, password);
      if (data.message) {
        // console.log(data.message);
        errors.apiRes = data.message;
        this.setState({errors: errors});
        return;
      }
      // console.log(data.data);
      // return;
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("name", data.data.name);
      // localStorage.setItem("user", { name: data.data.name, token: data.data.token});
      window.location = "/dashboard";
    } catch (error) {
      console.error(error);
    }
  };
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  render() {
    const { email, password, errors } = this.state;
    return (
      <div className="Login">
        {errors.email.length > 0 && 
          <span className='error'>{errors.email}<br /></span>}
        {errors.password.length > 0 && 
          <span className='error'>{errors.password}<br /></span>}
        {errors.apiRes.length > 0 && 
          <span className='error'>{errors.apiRes}<br /></span>}
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <Button onClick={this.send} block bsSize="large" type="submit">
          Connexion
        </Button>
        <div>
          <a href="#">Mot de passe oublié</a>
        </div>
      </div>
    );
  }
}
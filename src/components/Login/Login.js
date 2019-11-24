import React from "react";
import { Button, FormGroup, FormControl, ControlLabel, Grid, Row, Col } from "react-bootstrap";
import API from "../../utils/API";
import "./Login.css";

const validateForm = (errors) => {
  console.log(errors)
  let valid = true;
  Object.values(errors).forEach(
    // if we have an error string set valid to false
    (val) => val.length > 0 && (valid = false)
  );

  return valid;
}

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

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
  send = async(e) => {
    e.preventDefault();
    const { email, password, errors } = this.state;

    errors.email = '';
    errors.password = '';
    errors.apiRes = '';

    if (!email || email.length === 0) {
        errors.email = "Veillez renseigner votre adresse email";
    }

    if (!password || password.length === 0) {
        errors.password = "Veillez renseigner votre mot de passe";
    }

    this.setState({ errors: errors });

    if (!validateForm(this.state.errors)) {
        return;
    }

    try {
      const data = await API.login(email, password);
      if (data.data.message) {
          errors.apiRes = data.data.message;
          this.setState({ errors: errors });
          return;
      }
      localStorage.setItem("token", data.data.token);
      // localStorage.setItem("userId", data.data.id);
      // localStorage.setItem("user", { name: data.data.name, token: data.data.token});

      console.log(data.data);
      window.location = "/dashboard/admin/books";
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
              : 'Email non valide!';
          break;
        case 'password': 
          errors.password = 
            value.length < 4
              // ? 'Password must be 4 characters long!'
              ? 'Le mot de passe doit comporter au moins 4 caractères!'
              : '';
          break;
      }
      // this.setState({
      //     [event.target.id]: event.target.value
      // });
      this.setState({errors, [id]: value});
  };
  render() {
          const { email, password, errors } = this.state;
          return ( 
            <div className = "Login"> 
              <div className="menubar signup">
                  <span>Library</span>
              </div>
                <Grid className="grid">
                  <Row className="show-grid">
                    <Col xs={12} sm={12} md={8} mdOffset={2}>
                        {
                          (errors.email.length > 0 || errors.password.length > 0 || errors.apiRes.length > 0) &&
                          <div className="well err">
                          {errors.email.length > 0 && 
                              <span className='error'>{errors.email}<br /></span>}
                          {errors.password.length > 0 && 
                              <span className='error'>{errors.password}<br /></span>}
                          {errors.apiRes.length > 0 && 
                              <span className='error'>{errors.apiRes}<br /></span>}
                          </div>
                        }
                                            
                        <FormGroup controlId = "email" bsSize = "large">
                            <ControlLabel>Email</ControlLabel> 
                            <FormControl type = "email" value = { email } onChange = { this.handleChange } />
                        </FormGroup> 

                        <FormGroup controlId = "password" bsSize = "large">
                            <ControlLabel>Password</ControlLabel>
                            <FormControl type = "password" value = { password } onChange = { this.handleChange }  />
                        </FormGroup>

                        {/* <FormGroup>
                            <Button type = "submit"  bsSize = "large" onClick = { this.send } block>                                 Connexion 
                            </Button> 
                        </FormGroup>  */}
                      </Col>
                  </Row>
                  <Row>
                    <Col xs={12} sm={12} md={8} mdOffset={2}>
                      <div className="well groupe-btn">
                         <Button type = "submit"  bsStyle="warning" bsSize = "large" onClick = { this.send } block>               Connexion 
                         </Button> 
                        <a className = "signup" href = "/signup">Créer un compte</a> 
                        &nbsp;&nbsp;
                        <a className = "mot-de-pass-oublie" href = "/mdp-forgot">Mot de passe oublié</a> 
                      </div>
                    </Col>
                  </Row>
                </Grid>
              </div>
          );
      }
}
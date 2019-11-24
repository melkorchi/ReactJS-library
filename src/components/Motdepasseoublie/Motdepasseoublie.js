import React from "react";
import { Button, FormGroup, FormControl, ControlLabel, Grid, Row, Col } from "react-bootstrap";
import API from "../../utils/API";
import "./Motdepasseoublie.css";

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const validateForm = (errors) => {
  // console.log(errors)
  let valid = true;
  Object.values(errors).forEach(
    // if we have an error string set valid to false
    (val) => val.length > 0 && (valid = false)
  );

  return valid;
}

export class Motdepasseoublie extends React.Component {
  state = {
      email: "",
      password: "", 
      confirmpassword: "",
      token: "",
      message: "",
      errors: {
        email: "",
        password: "", 
        confirmpassword: ""
      }
  };

  loginPage = () => {
    window.location = '/login';
  };

  send = async(e) => {
    e.preventDefault();
    const { email, errors } = this.state;

    // Test email validité
    if (!email || email.length === 0) {
      errors.email = "Veillez renseigner votre adresse email";
    }

    this.setState({errors: errors});

    if (!validateForm(this.state.errors)) {
      return;
    }
    
    localStorage.setItem("email", email);

    try {
      const data = await API.forgotMdp(email);

      const message = "Un email vous a été envoyé à l'adresse " + email + " pour la réinitialisation de votre mot de passe. Veuillez consulter vos messages.";
      this.setState({message: message});
      // console.log(this.state);
      // window.location = '/login';
      setTimeout(this.loginPage, 30000);
    } catch (error) {
      console.error(error);
    }
  };

  updateMdp = async(e) => {
    e.preventDefault();
    // console.log(this.state);
    const { email, password, confirmpassword, errors } = this.state;

    if (!email || email.length === 0) {
      errors.email = "Veillez renseigner votre adresse email";
    }

    if (!password || password.length === 0) {
      errors.password = "Veillez renseigner votre mot de passe";
    }

    if (!confirmpassword || confirmpassword.length === 0) {
      errors.confirmpassword = "Veillez renseigner votre confirmation de mot de passe";
    }

    this.setState({errors: errors});

    if (!validateForm(this.state.errors)) {
      return;
    }

    try {
      // Now we can update the password
      const data = await API.ReinitMdp(email, password);
      window.location = "/login";
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
      default:
        break;
    }
    
    this.setState({errors, [id]: value});
  };

  handleChangeReinit = (event) => {
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
            ? 'Le mot de passe doit comporter 4 caractères au minimum!'
            : '';
        break;
      case 'confirmpassword': 
        errors.confirmpassword = 
          value !== this.state.password
            ? "Les mots de passe ne match pas!"
            : '';
        break;
      default:
        break;
    }
    
    this.setState({errors, [id]: value});
  };

  componentDidMount() {
    this.setState({token: this.props.match.params.token});
    if (localStorage.getItem("email")) this.setState({email: localStorage.getItem("email")});
  }

  render() {
          const { email, token, password, confirmpassword, errors, message } = this.state;
          return ( 
            <div className = "Motdepasseoublie"> 
              <div className="menubar signup">
                  <span>Library</span>
              </div>
                <Grid className="grid">
                  <Row className="show-grid">
                        {!token &&
                          <Col xs={12} sm={12} md={8} mdOffset={2}>
                            {
                              message &&
                            
                              <div className="well">
                                
                                  <span className='error'>{message}<br /></span>
                              </div>
                            }
                            {
                              (errors.email.length > 0) &&
                            
                              <div className="well err">
                                {errors.email.length > 0 && 
                                  <span className='error'>{errors.email}<br /></span>}
                              </div>
                            }
                            <FormGroup controlId = "email" bsSize = "large">
                              <ControlLabel>Email</ControlLabel> 
                              <FormControl type = "email" value = { email } onChange = { this.handleChange } />
                            </FormGroup>
                          </Col>
                        } 
                        {token &&
                          <Col xs={12} sm={12} md={8} mdOffset={2}>
                            <div className="well">
                              <p>Réinitialiser votre mot de passe</p>
                            </div>
                            {
                              (errors.email.length > 0 || errors.password.length > 0 || errors.confirmpassword.length > 0) &&
                            
                              <div className="well err">
                                {errors.email.length > 0 && 
                                  <span className='error'>{errors.email}<br /></span>}
                                {errors.password.length > 0 && 
                                  <span className='error'>{errors.password}<br /></span>}
                                {errors.confirmpassword.length > 0  && 
                                  <span className='error'>{errors.confirmpassword}<br /></span>}
                              </div>
                            }
                            <FormGroup controlId = "email" bsSize = "large">
                              <ControlLabel>Email</ControlLabel> 
                              <FormControl type = "email" readOnly value = { email } onChange = { this.handleChangeReinit } />
                            </FormGroup>
                            <FormGroup controlId="password" bsSize="large">
                              <ControlLabel>Password</ControlLabel>
                              <FormControl
                                value={password}
                                onChange={this.handleChangeReinit}
                                type="password"
                                placeholder="Enter password"
                                required
                              />
                            </FormGroup>
                            <FormGroup controlId="confirmpassword" bsSize="large">
                              <ControlLabel>Confirmation Password</ControlLabel>
                              <FormControl
                                value={confirmpassword}
                                onChange={this.handleChangeReinit}
                                type="password"
                                placeholder="Enter confirmation password"
                              />
                            </FormGroup>
                          </Col>
                        }               
                  </Row>
                  <Row>
                    <Col xs={12} sm={12} md={8} mdOffset={2}>
                      <div className="well groupe-btn">
                         {!token && 
                          <Button type = "submit"  bsStyle="warning" bsSize = "large" onClick = { this.send } block>               Rechercher 
                          </Button>} 
                          {token && 
                          <Button type = "submit"  bsStyle="warning" bsSize = "large" onClick = { this.updateMdp } block>          Réinitialiser 
                          </Button>} 
                      </div>
                    </Col>
                  </Row>
                </Grid>
              </div>
          );
      }
}
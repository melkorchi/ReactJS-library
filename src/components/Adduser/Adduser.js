import React from "react";
import { Button, FormGroup, FormControl, ControlLabel, Breadcrumb, Grid, Row, Col} from "react-bootstrap";
import API from "../../utils/API";
import Select from 'react-select';
import './Adduser.css';

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

export class Adduser extends React.Component {
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
      errors.email = "Veillez renseigner l' adresse email";
    }

    if (!password || password.length === 0) {
      errors.password = "Veillez renseigner le mot de passe";
    }

    if (!confirmpassword || confirmpassword.length === 0) {
      errors.confirmpassword = "Veillez renseigner la confirmation de mot de passe";
    }

    if (!name || name.length === 0) {
      errors.name = "Veillez renseigner le nom";
    }

    this.setState({errors: errors});

    if (!validateForm(this.state.errors)) {
      return;
    }

    try {
      // const fromInside = true;
      const data = await API.signup({ email, password, name, avatar, role });
      console.log(data);
      // Warning: data.code not necessarily defined
      if (data.code && data.code != 200) {
        errors.apiRes = data.message;
        this.setState({errors: errors});
        // console.log(this.state);
        return;
      }

      // localStorage.setItem("token", data.tokens[0].token);
      localStorage.setItem("userId", data.id);
      window.location = "/dashboard/admin/users";
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
            ? 'Name must be 4 characters long!'
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
      <div className="Adduser">
        <Breadcrumb>
          <Breadcrumb.Item href="/dashboard/admin/users">
            Users
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Add</Breadcrumb.Item>
        </Breadcrumb>
        <Grid>
          <Row className="show-grid">
            <Col xs={12} sm={12} md={8} mdOffset={2}>
              {
                (errors.email.length > 0 || errors.password.length > 0 || errors.confirmpassword.length > 0 ||  errors.name.length > 0) &&
              
              <div className="well err">
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
              </div>
              }
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
                <Select options = {options} onChange={this.handleSelectChange} defaultValue={{ label: "USER", value: "ROLE_USER" }} />
              </FormGroup>
            </Col>
          </Row>
          <Row className="show-grid">
              <Col xs={12} sm={12} md={8} mdOffset={2} >
              <div className="well groupe-btn">
                <Button onClick={this.send} bsStyle="warning" block bsSize="large" type="submit">
                  Créer le compte
                </Button>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
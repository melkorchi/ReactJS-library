import React from "react";
import { Button, FormGroup, FormControl, ControlLabel, Breadcrumb, Grid, Row, Col} from "react-bootstrap";
import API from "../../utils/API";
import Select from 'react-select';
import './Edituser.css';

const options = [
  { value: 'ROLE_USER', label: 'USER' },
  { value: 'ROLE_ADMIN', label: 'ADMIN' }
];

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

export class Edituser extends React.Component {
  state = {
    email: "",
    password: "",
    confirmpassword: "", 
    name: "",
    avatar: "",
    role: "ROLE_USER",
    // idUser: 88,
    idUser: this.props.match.params.idUser,
    errors: {
      name: '',
      email: '',
      password: '',
      confirmpassword: ""
    }
  };

  async getUserById (id) {
    return await API.getUserById(id);
  };

  send = async (e) => {
    e.preventDefault();
    const { idUser, email, password, confirmpassword, name, avatar, role, errors } = this.state;
    errors.name= '';
    errors.email= '';
    errors.password= '';
    errors.confirmpassword= '';

    if (!email || email.length === 0) {
      errors.email = "Veillez renseigner l' adresse email";
    }

    if ( password.length === 0 && confirmpassword.length === 0 ) {
      // 
    } else {
      if (!password || password.length === 0) {
        errors.password = "Veillez renseigner le mot de passe";
      }

      if (!confirmpassword || confirmpassword.length === 0) {
        errors.confirmpassword = "Veillez renseigner la confirmation de mot de passe";
      }

      if (confirmpassword != password) {
        errors.confirmpassword = "Passwords don't match!";
      }

    }



   

    if (!name || name.length === 0) {
      errors.name = "Veillez renseigner le nom";
    }

    this.setState({errors: errors});

    if (!validateForm(this.state.errors)) {
      return;
    }

    console.log(this.state)

    try {
      const data = await API.updateUser(idUser, email, password, name, avatar, role);
      console.log(data);
      // Warning: data.code not necessarily defined
      if (data.code && data.code != 200) {
        errors.apiRes = data.message;
        this.setState({errors: errors});
        // console.log(this.state);
        return;
      }

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
  };
  handleSelectChange = (selectedOption) => {
    this.setState( {role: selectedOption.value} );
  };
  handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm(this.state.errors)) {
      console.info('Valid Form')
    } else {
      console.error('Invalid Form')
    }
  };

  componentWillReceiveProps() {
    console.log(this.props)
  }
  componentWillUpdate() {
    console.log(this.props)
  }
  componentDidUpdate() {
    console.log(this.props)
  }
  componentWillMount() {
    console.log(this.props)
  }
  componentDidMount() {
    // console.log(this.props);
    this.getUserById(this.state.idUser).then(data => {
      console.log(data);
      this.setState({ 
        email: data[0].email,
        name: data[0].name,
        role: data[0].role,
        avatar: data[0].avatar
      });
    }).catch(err=> {
      console.log(err);
      // this.setState({err: err});
    });
  }

  render() {
    const { email, password, confirmpassword, name, avatar, role, errors } = this.state;

    return (
      <div className="Edituser">
        <Breadcrumb>
          <Breadcrumb.Item href="/dashboard/admin/users">
            Users
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Edit</Breadcrumb.Item>
        </Breadcrumb>
        <Grid>
          <Row className="show-grid">
            <Col xs={12} sm={12} md={8} mdOffset={2}>
              {
                ((errors.email && errors.email.length > 0) || (errors.password && errors.password.length > 0) || (errors.confirmpassword && errors.confirmpassword.length > 0) || (errors.name && errors.name.length > 0)) &&
              
              <div className="well err">
                {errors.email.length > 0 && 
                  <span className='error'>{errors.email}<br /></span>}
                {errors.password.length > 0 && 
                  <span className='error'>{errors.password}<br /></span>}
                {errors.confirmpassword.length > 0  && 
                  <span className='error'>{errors.confirmpassword}<br /></span>}
                {errors.name.length > 0 && 
                  <span className='error'>{errors.name}<br /></span>}
                {(errors.apiRes && errors.apiRes.length > 0) && 
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
                <Button onClick={this.send} bsStyle="success" block bsSize="large" type="submit">
                  Editer
                </Button>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
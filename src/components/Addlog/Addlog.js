import React from "react";
import { Button, FormGroup, FormControl, ControlLabel, Col, Row, Grid, Breadcrumb } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import API from "../../utils/API";
import "react-datepicker/dist/react-datepicker.css";
import "./Addlog.css";

import fr from "date-fns/locale/fr"; // the locale you want
registerLocale("fr", fr); // register it with the name you want

export class Addlog extends React.Component {
  state = {
    ip: "",
    latitude: "",
    longitude: "",
    date: new Date(), 
    userId:parseInt(localStorage.getItem("userId")),
    errors: {
      ip: "",
      latitude: "",
      longitude: "", 
      date: "",
      userId: ""
    }
  }

  validateIPaddress = (ipaddress) => {  
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {  
      return (true)  
    }  
    return (false)  
  }  

  handleDateChange = date => {
    this.setState({
      date: date
    });
  };
  handleChange = (event) => {
    // this.setState({
    //   [event.target.id]: event.target.value
      
    // });
    const { id, value } = event.target;
    let errors = this.state.errors;
    switch (id) {
      case 'ip': 
        errors.ip = 
          this.validateIPaddress(value)
            ? ''
            : 'Ip adress is not valid';
        break;
      case 'userId': 
        errors.userId = 
          !Number.isInteger(parseInt(value))
            ? 'Identifiant must be an integer'
            : '';
        break;
      default:
        break;
    }
    this.setState({errors, [id]: value});
  };
  send = async(e) => {
    // console.log(this.state);
    e.preventDefault();
    const { ip, date, userId, errors } = this.state;
    errors.ip= '';
    errors.userId= '';

    if (!ip || ip.length === 0) {
      errors.ip = "Veillez renseigner une adresse ip";
    }

    if (!this.validateIPaddress(ip)) {
      errors.ip = "Veillez renseigner une adresse ip valide";
    }

    if (!userId) {
      errors.userId = "Veillez renseigner un identifiant utilisateur";
    }

    if (!Number.isInteger(parseInt(userId))) {
      errors.userId = "Veillez renseigner un identifiant valide";
    }

    if (!date) {
      errors.userId = "Veillez renseigner une date de connexion";
    }

    this.setState({errors: errors});

    try {
      console.log(this.state);
      const data  = await API.addLog(ip, userId, date);
      // console.log(data);
      window.location = "/dashboard/admin/logs";
    } catch (error) {
      console.error(error);
    }
  };
  handleLinkChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  render() {
    console.log(this.state);
    const {ip, userId, errors} = this.state;
    return (
      <div className="Addbook">
        {/* <h3>Ajouter un log</h3> */}
        {errors.ip.length > 0 && 
          <span className='error'>{errors.ip}<br /></span>}
        {errors.userId.length > 0 && 
          <span className='error'>{errors.userId}<br /></span>}
        {errors.date.length > 0 && 
          <span className='error'>{errors.date}<br /></span>}
        <Breadcrumb>
          <Breadcrumb.Item href="/dashboard/admin/logs">
            Logs
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Add</Breadcrumb.Item>
        </Breadcrumb>
        <Grid>
          <Row className="show-grid">
            <Col xs={12} sm={12} md={8} mdOffset={2} >
              <FormGroup controlId="ip" bsSize="large">
                <ControlLabel>Ip</ControlLabel>
                <FormControl
                  autoFocus
                  type="text"
                  value={ip}
                  onChange={this.handleChange}
                  placeholder="ip"
                  required
                />
              </FormGroup>
              <FormGroup controlId="userId" bsSize="large">
                <ControlLabel>Identifiant</ControlLabel>
                <FormControl
                  autoFocus
                  type="number"
                  value={userId}
                  onChange={this.handleChange}
                  placeholder="userId"
                  required
                />
              </FormGroup>
              <label htmlFor="">Date de connexion</label>
              <DatePicker
                  locale="fr"
                  showTimeSelect
                  dateFormat="dd/MM/yyyy HH:mm:ii"
                  selected={this.state.date}
                  onChange={this.handleDateChange}
                />
            </Col>
          </Row>
          <Row className="show-grid">
              <Col xs={12} sm={12} md={8} mdOffset={2} >
              <div className="well groupe-btn">
                <Button onClick={this.send} bsStyle="warning" block bsSize="large" type="submit">
                  Ajouter
                </Button>
              </div>

            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

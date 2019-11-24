import React from "react";
import { Button, FormGroup, FormControl, ControlLabel, Col, Row, Grid, Breadcrumb } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import API from "../../utils/API";
import "react-datepicker/dist/react-datepicker.css";
import "./Editlog.css";

import fr from "date-fns/locale/fr"; // the locale you want
registerLocale("fr", fr); // register it with the name you want

export class Editlog extends React.Component {
  state = {
    ip: "",
    latitude: "",
    longitude: "",
    date: new Date(), 
    idLog: this.props.match.params.idLog,
    errors: {
      ip: "",
      latitude: "",
      longitude: "", 
      date: "",
      userId: ""
    }
  }

  async getLogById (id) {
    return await API.getLogById(id);
  };

  componentDidMount = () => {
    this.getLogById(this.state.idLog).then(data => {
      this.setState({ 
        ip: data.ip,
        date: new Date(data.date),
        userId: data.userId
       });
    }).catch(err=> {
      console.log(err);
      // this.setState({err: err});
    });
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
          // !Number.isInteger(parseInt(value))
          !Number.isInteger(value)
            ? 'Identifiant must be an integer'
            : '';
        break;
      default:
        break;
    }
    this.setState({errors, [id]: value});
  };
  send = async(e) => {
    e.preventDefault();
    const { idLog, ip, date, userId, errors } = this.state;
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

    if (!Number.isInteger(parseInt(userId) || userId < 0)) {
      errors.userId = "Veillez renseigner un identifiant valide";
    }

    if (!date) {
      errors.userId = "Veillez renseigner une date de connexion";
    }

    this.setState({errors: errors});
    // ip 91.161.240.34
    // 115.42.150.37
    // 110.234.52.124
    // 91.161.240.34
    // 198.12.23.1
    try {
      console.log(this.state);
      if (errors.ip || errors.userId) return;
      const data  = await API.updateLog(idLog, ip, userId, date);
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
      <div className="Editlog">
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
          <Breadcrumb.Item active>Edit</Breadcrumb.Item>
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
                <Button onClick={this.send} bsStyle="success" block bsSize="large" type="submit">
                  Editer
                </Button>
              </div>

            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

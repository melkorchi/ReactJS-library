import React from "react";
import { Button, FormGroup, FormControl, ControlLabel, Breadcrumb, Grid, Row, Col } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import Select from 'react-select';
import API from "../../utils/API";
import "react-datepicker/dist/react-datepicker.css";
import "./Removeuser.css";

import fr from "date-fns/locale/fr"; // the locale you want
registerLocale("fr", fr); // register it with the name you want

export class Removeuser extends React.Component {
  state = {
    idUser: this.props.match.params.idUser
  }

  remove = async(e) => {
    console.log(this.state);
    e.preventDefault();
    const { idUser } = this.state;
    try {
      // const data  = await API.removeUser(idUser);
      const data  = await API.softRemoveUser(idUser);
      window.location = "/dashboard/admin/users";
    } catch (error) {
      console.error(error);
    }
  }

  confirm = (e) => {
    this.remove(e);
  }

  cancel = () => {
    window.location = "/dashboard/admin/users";
  };

  render() {
    return (
      <div className="Removeuser">
        <Breadcrumb>
          <Breadcrumb.Item href="/dashboard/admin/users">
            Users
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Remove</Breadcrumb.Item>
        </Breadcrumb>
        <Grid>
          <Row className="show-grid">
            <Col xs={12} sm={12} md={8} mdOffset={2} >
              
               <div className="well groupe-btn">
                <ControlLabel>Confirmer la suppression ?</ControlLabel>
                <Button onClick={this.confirm} bsStyle="danger" bsSize="large" block>
                  Supprimer
                </Button>
                <Button onClick={this.cancel} bsStyle="primary" bsSize="large" block>
                  Annuler
                </Button>
              </div>

            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

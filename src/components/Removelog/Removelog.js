import React from "react";
import { Button, FormGroup, FormControl, ControlLabel, Breadcrumb, Grid, Row, Col } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
// import {MarkdownTextarea}  from "react-markdown-textarea";
import Select from 'react-select';
import API from "../../utils/API";
import "react-datepicker/dist/react-datepicker.css";
import "./Removelog.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "bootstrap-css-only/css/bootstrap.min.css";

import fr from "date-fns/locale/fr"; // the locale you want
registerLocale("fr", fr); // register it with the name you want

export class Removelog extends React.Component {
  state = {
    idLog: this.props.match.params.idLog,
  }

  remove = async(e) => {
    console.log(this.state);
    e.preventDefault();
    const { idLog } = this.state;
    try {
      const data  = await API.removeLog(idLog);
      window.location = "/dashboard/admin/logs";
    } catch (error) {
      // console.error(error);
    }
  }

  confirm = (e) => {
    this.remove(e);
  }

  cancel = () => {
    window.location = "/dashboard/admin/logs";
  };

  render() {
    return (
      <div className="Removelog">
        <Breadcrumb>
          <Breadcrumb.Item href="/dashboard/admin/books">
            Logs
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

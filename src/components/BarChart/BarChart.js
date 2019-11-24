import React, { Component } from 'react';
import {Bar, Pie} from 'react-chartjs-2';
import { Breadcrumb, Grid, Col, Row } from "react-bootstrap";
import API from "../../utils/API";

export class BarChart extends Component
{
   constructor(props) {
      super(props);
      this.state = {

      }
  }

  async getLogsGroupByUserId () {
    return await API.getLogsGroupByUserId();
  };

  async getUsers () {
    return await API.getUsers();
  };

  componentDidMount() {
    this.getUsers().then(data => {
      let aUsers = [];
      // console.log(data);
      data.forEach(element => {
        aUsers.push({id: element.id, name: element.name})
      });
      // console.log(aUsers);
      this.setState({aUsers: aUsers});
    });

    this.getLogsGroupByUserId().then(data => {
      // console.log(data.logs);
      const donnees = data.logs;
      let users = [];
      let nbConnexions = [];
      const { aUsers } = this.state;
      donnees.forEach(element => {
        aUsers.map(e => {
          if (element._id === e.id) users.push(e.name);
        });
        nbConnexions.push(element.count);
      });
  
      let options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
      }

      this.setState({ 
        Data: {
          labels: users,
          datasets:[
              {
                label:'Nombre de connexions par utilisateur',
                data: nbConnexions ,
                backgroundColor:[
                  'rgba(255,105,145,0.6)',
                  'rgba(155,100,210,0.6)',
                  'rgba(90,178,255,0.6)',
                  'rgba(240,134,67,0.6)',
                  'rgba(120,120,120,0.6)',
                  'rgba(250,55,197,0.6)'
              ],
              // borderWidth: 1,
              barPercentage: 0.5,
              barThickness: 50,
              // maxBarThickness: 50,
              // minBarLength: 1,
              },
          ],
          axes: [
            { primary: true, type: 'linear', position: 'bottom' },
            { type: 'linear', position: 'left' }
          ],
          options: options
        }
      });
    });
  }
   render()
   {
      return(
         <div>
            <Breadcrumb>
              <Breadcrumb.Item href="/dashboard/admin/logs">
                Logs
              </Breadcrumb.Item>
              <Breadcrumb.Item active>BarChart</Breadcrumb.Item>
            </Breadcrumb>
            <Grid>
              <Row className="show-grid">
                <Col xs={12} sm={12} md={12} lg={12}>
                  <h2>Nombre de connexions par utilisateur</h2>
                  {/* <Bar data = {this.state.Data} options = {{ maintainAspectRatio: false }}/> */}
                  <Bar data = {this.state.Data} axes = {this.state.axes}/>
                </Col>
              </Row>
            </Grid>
         </div>
      )
   }
}
import React, { Component } from "react";
import { Button, Breadcrumb, Grid, Col, Row } from "react-bootstrap";
import "./Adminlogs.css";
import {Search} from "../Search/Search"; // With class
import API from "../../utils/API";
import Pagination from "../Pagination/Pagination.js";
import * as _ from "lodash";


export class Adminlogs extends React.Component { 

  constructor(props) {
    super(props);
    let exampleItems = [...Array(150).keys()].map(i => ({ id: (i+1), name: 'list item ' + (i+1) }));
    this.state = {
      logs: [],
      exampleItems: exampleItems,
      pageOfItems: [],
      err: {
        err: false,
        httpCode: null
      }
    }
    this.handler = this.handler.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.onSort = this.onSort.bind(this);
  }

  async getLogs () {
    return await API.getLogs();
  };

  async searchLogs (e) {
    return await API.searchLogs(e);
  };

  componentWillMount = () => {
    // console.log(this.state)
  }

  componentDidMount = () => {
    this.getLogs().then(data => {
      this.setState({logs: data});
    }).catch(err=> {
      // if (err.httpCode == 500) err.messageErr ="Internal Server Error";
      this.setState({err: err});
    });
  }

  handleClick = () => {
    window.location = '/dashboard/admin/logs/add';
  }

  handleClickBarChart = () => {
    window.location = '/dashboard/admin/logs/reporting/barchart';
  }

  handleClickPieChart = () => {
    window.location = '/dashboard/admin/logs/reporting/piechart';
  }

  handleEditClick = (id) => {
    window.location = `/dashboard/admin/logs/edit/${id}`;
  }

  handleRemoveClick = (id) => {
    window.location = `/dashboard/admin/logs/remove/${id}`;
  }

  handler = (search) => {
    // console.log('search', search);
    this.searchLogs(search).then(data => {
      const err = {
        err: false,
        httpCode: null
      }
      this.setState({
        logs: data,
        err: err
      });
    }).catch(err=> {
      if (err.httpCode == 500) err.messageErr ="Internal Server Error";
      this.setState({err: err});
    });
  };

  onChangePage(pageOfItems) {
      // update state with new page of items
      this.setState({ pageOfItems: pageOfItems });
  };

  onSort(event, sortKey){
    let data = this.state.pageOfItems;
    // let sortedData = _.sortBy(data,sortKey);
    let ascSortedData = _.orderBy(data, sortKey, 'asc');
    let descSortedData = _.orderBy(data, sortKey, 'desc');
    
    if (_.isEqual(data, ascSortedData)) data = descSortedData;
    else data = ascSortedData;
    
    this.setState({pageOfItems: data});
  }

  render() {
    console.log(this.state)
    const {logs, err, pageOfItems} = this.state;
    return (
      <div className = "Adminlogs">
        <Breadcrumb>
          <Breadcrumb.Item href="/dashboard/admin/logs">
            Logs
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Liste</Breadcrumb.Item>
        </Breadcrumb>
        {err.err === true && 
          <Grid>
            <Row className="show-grid">
              <Col xs={12} sm={12} md={12} lg={12}>
                <div className="well">
                  <span className='error'>{err.messageErr}<br /></span>
                </div>
              </Col>
            </Row>
          </Grid>
        }
        {err.err === false && 
        <Grid>
          <Row className="show-grid">
            <Col xs={12} sm={12} md={12} lg={12}>
              <Search action={this.handler}></Search>
              <table className = "table table-striped table-hover">
                <tbody>
                    <tr className="head">
                      <td className="cell" onClick={e => this.onSort(e, 'id')}>id</td>
                      <td className="cell" onClick={e => this.onSort(e, 'ip')}>IP</td>
                      <td className="cell">Localisation</td>
                      <td className="cell" onClick={e => this.onSort(e, 'userId')}>UserID</td>
                      <td className="cell" onClick={e => this.onSort(e, 'date')}>Date de connection</td>
                      <td className="cell">Actions</td>
                    </tr>
                    {
                      pageOfItems.map(({ id, ip, location, userId, date}) => (
                        <tr key={id} className="body">
                          <td className="cell">{id}</td>
                          <td className="cell">{ip}</td>
                          <td className="cell">latitude: {location.latitude}<br />longitude: {location.longitude}</td>
                          <td className="cell">{userId}</td>
                          <td className="cell">{new Date(date).toLocaleDateString()} {new Date(date).toLocaleTimeString()}</td>
                          <td className="cell">
                            <Button bsSize="small" onClick={()=>this.handleEditClick(id)} bsStyle="success" type="submit">
                              Editer
                            </Button>
                            <Button bsSize="small" onClick={()=>this.handleRemoveClick(id)} bsStyle="danger" type="submit">
                              Supprimer
                            </Button>
                          </td>
                        </tr>
                      ))
                    }

                </tbody> 
              </table>
              <Pagination items={this.state.logs} onChangePage={this.onChangePage} />
            </Col>
            </Row>
            <Row>
              <Col xs={12} sm={12} md={12}>
                <div className="well btn-add">
                  <Button bsStyle="warning" onClick={this.handleClick.bind()} bsSize="large" type="submit">Ajouter un log</Button>
                  <Button bsStyle="warning" onClick={this.handleClickBarChart.bind()} bsSize="large" type="submit">BarChart</Button>
                  <Button bsStyle="warning" onClick={this.handleClickPieChart.bind()} bsSize="large" type="submit">PieChart</Button>
                </div>
              </Col>
            </Row>
          </Grid>
        }
      </div>
    );
  }
}

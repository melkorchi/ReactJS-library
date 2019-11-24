import React, { Component } from "react";
import { Button, Breadcrumb, Grid, Col, Row } from "react-bootstrap";
import "./Adminusers.css";
import {Search} from "../Search/Search"; 
import API from "../../utils/API";
import Pagination from "../Pagination/Pagination.js";
import * as _ from "lodash";

// const Adminusers = ({users}) => (

//   <div className = "Adminusers">
//     <Search></Search>
//     <table className = "table table-striped table-hover">
//       <tbody>
//           <tr className="head">
//             <td className="cell">id</td>
//             <td className="cell">Email</td>
//             <td className="cell">Password</td>
//             <td className="cell">Name</td>
//             <td className="cell">Rôle</td>
//             <td className="cell">Date de création</td>
//             <td className="cell">Avatar</td>
//             <td className="cell">Actions</td>
//           </tr>
            
//           {
//             users.map(({ id, email, password, name, role, createdAt, avatar }) => (
//               <tr key={id}>
//                 <td className="cell">{id}</td>
//                 <td className="cell">{email}</td>
//                 <td className="cell">{password}</td>
//                 <td className="cell">{name}</td>
//                 <td className="cell">{role}</td>
//                 <td className="cell">{new Date(createdAt).toLocaleDateString()}</td>
//                 <td className="cell">{avatar}</td>
//                 <td className="cell">
//                   <Button bsSize="small" bsStyle="success" type="submit">
//                     Editer
//                   </Button>
//                   <Button bsSize="small" bsStyle="danger" type="submit">
//                     Supprimer
//                   </Button>
//                 </td>
//               </tr>
//             ))
//           }
//       </tbody> 
//     </table>
//     <div className="btn-add">
//       <Button bsStyle="warning" onClick={handleClick.bind()} bsSize="large" type="submit">Ajouter un utilisateur</Button>
//     </div>
//   </div>
// )

// function handleClick() {
//   // e.preventDefault();
//   window.location = '/dashboard/admin/users/add';
// }

// export default Adminusers;

export class Adminusers extends React.Component { 

  constructor(props) {
    super(props);
    this.state = {
      users: [],
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

  async getUsers () {
    return await API.getUsers();
  };

  async searchUsers (e) {
    return await API.searchUsers(e);
  };

  componentWillMount = () => {}

  componentDidMount = () => {
    this.getUsers().then(data => {
      this.setState({users: data});
    }).catch(err=> {
      // if (err.httpCode == 500) err.messageErr ="Internal Server Error";
      this.setState({err: err});
    });
  }

  handleClick = () => {
    window.location = '/dashboard/admin/users/add';
  }

  handleEditClick = (id) => {
    window.location = `/dashboard/admin/users/edit/${id}`;
  }

  handleRemoveClick = (id) => {
    window.location = `/dashboard/admin/users/remove/${id}`;
  }

  handler = (search) => {
    console.log('search', search);
    this.searchUsers(search).then(data => {
      const err = {
        err: false,
        httpCode: null
      }
      this.setState({
        users: data,
        err: err
      });
    }).catch(err=> {
      if (err.httpCode == 500) err.messageErr ="Internal Server Error";
      this.setState({err: err});
    });
    // console.log(this.state);
  }

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
  };

  render() {
    const {users, pageOfItems, err} = this.state;
    // console.log(this.state)
    return (
      <div className = "Adminusers">
        <Breadcrumb>
          <Breadcrumb.Item href="/dashboard/admin/users">
            Users
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
                            <td className="cell" onClick={e => this.onSort(e, 'email')}>Email</td>
                            {/* <td className="cell">Password</td> */}
                            <td className="cell" onClick={e => this.onSort(e, 'name')}>Name</td>
                            <td className="cell" onClick={e => this.onSort(e, 'role')}>Rôle</td>
                            <td className="cell" onClick={e => this.onSort(e, 'createdAt')}>Date de création</td>
                            <td className="cell">Avatar</td>
                            <td className="cell">Actions</td>
                          </tr>
                          
                          {
                            pageOfItems.map(({ id, email, password, name, role, createdAt, avatar }) => (
                              <tr key={id} className="body">
                                <td className="cell">{id}</td>
                                <td className="cell">{email}</td>
                                {/* <td className="cell">{password}</td> */}
                                <td className="cell">{name}</td>
                                <td className="cell">{role}</td>
                                <td className="cell">{new Date(createdAt).toLocaleDateString()}</td>
                                <td className="cell">{avatar}</td>
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
                      <Pagination items={users} onChangePage={this.onChangePage} />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} sm={12} md={12}>
                      <div className="well btn-add">
                        <Button bsStyle="warning" onClick={this.handleClick.bind()} bsSize="large" type="submit">Ajouter un utilisateur</Button>
                      </div>
                    </Col>
                  </Row>
                </Grid>

        }
        
      </div>
    );
  }
}


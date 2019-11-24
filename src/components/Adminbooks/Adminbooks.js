import React, { Component } from "react";
import { Button, Breadcrumb, Grid, Row, Col, Image, Panel, Label, Modal } from "react-bootstrap";
import "./Adminbooks.css";
// import Search from "../Search/Search";
import {Search} from "../Search/Search"; // With class
import API from "../../utils/API";
import Pagination from "../Pagination/Pagination.js";
import * as _ from "lodash";

export class Adminbooks extends React.Component { 

  constructor(props) {
    super(props);
    this.state = {
      books: [],
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

  async getBooks () {
    return await API.getBooks();
  };

  async searchBooks (e) {
    return await API.searchBooks(e);
  };

  componentWillMount = () => {
  }

  componentDidMount = () => {
    this.getBooks().then(data => {
      const err = { err: false, httpCode: null, auth: true };
      this.setState({ books: data, err: err });
    }).catch(err=> {
      // console.log(err);
      this.setState({err: err});
    });
  }

  handleAddClick = () => {
    window.location = '/dashboard/admin/books/add';
  }

  handleEditClick = (id) => {
    window.location = `/dashboard/admin/books/edit/${id}`;
  }

  handleRemoveClick = (id) => {
    window.location = `/dashboard/admin/books/remove/${id}`;
  }

  handler = (search) => {
    console.log('search', search);
    this.searchBooks(search).then(data => {
      // console.log(data);
      const err = { err: false, httpCode: null, auth: true };
      this.setState({ books: data, err: err });
    }).catch(err=> {
      if (err.httpCode == 500) err.messageErr ="Internal Server Error";
      this.setState({err: err});
    });
  }

  view = (id) => {
    console.log('view', id);
    window.location = `/dashboard/admin/books/view/${id}`;
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
    const {books, pageOfItems, err} = this.state;
    console.log(this.state)
    return (
      <div className = "Adminbooks">
        <Breadcrumb>
          <Breadcrumb.Item href="/dashboard/admin/books">
            Books
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
                {/* table-hover */}
              <table className = "table table-striped"> 
              <tbody>
                  <tr className="head">
                    <td className="cell" onClick={e => this.onSort(e, 'id')}>id</td>
                    <td className="cell" onClick={e => this.onSort(e, 'title')}>Titre</td>
                    <td className="cell" onClick={e => this.onSort(e, 'author')}>Auteur</td>
                    {/* <td className="cell">Description</td> */}
                    <td className="cell" onClick={e => this.onSort(e, 'publishedDate')}>Date de publication</td>
                    <td className="cell">Actions</td>
                  </tr>
                    
                  {
                    pageOfItems.map(({ id, title, author, description, publishedDate, links }) => (
                      <tr key={id} className="body">
                        <td className="cell">{id}</td>
                        <td className="cell">{title}</td>
                        <td className="cell">{author}</td>
                        {/* <td className="cell">{description}</td> */}
                        <td className="cell">{new Date(publishedDate).toLocaleDateString()}</td>
                        {/* <td className="links">{links}</td> */}
                        <td className="cell">
                          <Button bsSize="small" onClick={()=>this.view(id)} bsStyle="primary" type="submit">
                            Voir
                          </Button>
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
            <Pagination items={books} onChangePage={this.onChangePage} />
            </Col>
          </Row>
            <Row>
            <Col xs={12} sm={12} md={12} >
              <div className="well btn-add">
                <Button bsStyle="warning" onClick={this.handleAddClick.bind()} bsStyle="warning" bsSize="large" type="submit">Ajouter un livre</Button>
              </div>
            </Col>
          </Row>
        </Grid>
      }
      </div>
    );
  }
}
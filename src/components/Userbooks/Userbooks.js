import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./Userbooks.css";
import {Search} from "../Search/Search";
import API from "../../utils/API";

export class Userbooks extends React.Component { 

  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
    this.state = {
      books: [],
      err: {
        err: false,
        httpCode: null
      }
    }
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
      this.setState({err: err});
    });
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
    // console.log(this.state);
  }

   view = (id) => {
    console.log('view', id);
    window.location = `/dashboard/admin/books/view/${id}`;
  }

  render() {
    const {books, err} = this.state;
    // console.log(this.state)
    return (
      <div className = "Userbooks">
        {err.auth === true && <Search action={this.handler}></Search>}
        {err.err === true && 
          <span className='error'>{err.messageErr}<br /></span>}
        {err.err === false && 
        <table className = "table table-striped table-hover">
          <tbody>
              <tr className="head">
                <td className="cell">id</td>
                <td className="cell">Titre</td>
                <td className="cell">Auteur</td>
                {/* <td className="cell">Description</td> */}
                <td className="cell">Date de publication</td>
                <td className="cell">Actions</td>
              </tr>
                
              {
                books.map(({ id, title, author, description, publishedDate, links }) => (
                  <tr key={id}>
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
                    </td>
                  </tr>
                ))
              }
          </tbody> 
        </table>}
      </div>
    );
  }
}
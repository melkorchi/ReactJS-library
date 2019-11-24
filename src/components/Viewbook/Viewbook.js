import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import API from "../../utils/API";
import "react-datepicker/dist/react-datepicker.css";
import "./Viewbook.css";
import { Grid, Row, Col, Image, Breadcrumb, Panel, Label, Modal} from 'react-bootstrap';
// import img from '../../Images/rumî.jpg';

import fr from "date-fns/locale/fr"; // the locale you want
registerLocale("fr", fr); // register it with the name you want

export class Viewbook extends React.Component {
  constructor(props, context) {
    super(props, context);
    console.log(this.props.users)
    this.handleHide = this.handleHide.bind(this);
    this.state = {
      books: {
        title: "",
        author: "",
        publishedDate: "", 
        description: "",
        urlImage: "",
        isImageExists: false,
        // rate:"",
        // comment:"",
        // userId: 19,
        // link:"",
        rating: [],
        links: [
          {name: "Amazon", link: "http://www.amazon.fr"}
        ],

      },
      idBook: this.props.match.params.id,
      show: false
    }
  }

  async getBook (id) {
    return await API.getBook(id);
  };

   async getUsers () {
    return await API.getUsers();
  };

  handleHide() {
    this.setState({ show: false });
  };

  componentDidMount = () => {
    this.getUsers().then(data => {
      this.setState({users: data});
    });
    this.getBook(this.state.idBook).then(data => {
      const err = { err: false, httpCode: null, auth: true };
      this.setState({ books: data.books[0], err: err });
      // Test si l'image existe
      const isImageExists = this.imageExists(this.state.books.urlImage);
      if (isImageExists) document.getElementById("img-livre").style.backgroundImage  = `url(${this.state.books.urlImage})`;
    }).catch(err=> {
      this.setState({err: err});
    });
    
  };

  addComment = () => {
    window.location = `/dashboard/admin/books/comment/add/${this.state.idBook}`;
  }

  imageExists = (image_url) => {
    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status != 404;
  }

  render() {
    console.log(this.state);
    const { title, author, publishedDate, description, links, rating } = this.state.books;
    return (
      <div className="Viewbook">
        <Breadcrumb>
          <Breadcrumb.Item href="/dashboard/admin/books">
            Books
          </Breadcrumb.Item>
          <Breadcrumb.Item active>View</Breadcrumb.Item>
        </Breadcrumb>
        <Grid>
          <Row className="show-grid">
            <Col xs={12} md={4}>
              <div id="img-livre" className="image well">
              </div>
            </Col>
            <Col xs={12} md={8}>
              <div className="data well">
                <div><Label className="label-info">Titre</Label>{(title)}</div>
                <div><Label className="label-info">Auteur</Label>{author}</div>
                <div><Label className="label-info">Date</Label>{new Date(publishedDate).toLocaleDateString()}</div>
                <div><Label className="label-info">Description</Label>{description}</div>
                <div>
                  <Label className="label-info">Liens</Label>
                  <ul className="">
                    {links.map((item, index) => (
                        <li key={index}>
                            {item.name}&nbsp;({item.link})
                        </li>
                    ))} 
                  </ul>
                </div>
                  
              </div>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12} sm={12} md={12}>
              <div className="well">
                <Button onClick={() => this.addComment()} bsStyle="primary" bsSize="large" >
                  Commentaires
                </Button>
              </div>
            </Col>
          </Row> 
          <Row className="show-grid">
             <Col xs={12} sm={12} md={12} >
              <div className="well">
                <table>
                  {rating.map((item, i) => (
                    <tr key={i}>
                      <td>
                        <span className="username">
                          {this.state.users.map((user, k) => (
                            (user.id == item.userId) && user.name
                          ))}
                        </span>
                        <span className="date">
                           {new Date(item.commentPublicationDate).toLocaleDateString()} {new Date(item.commentPublicationDate).toLocaleTimeString()}
                        </span>
                        <span className="rate">
                          {
                            [1,2,3,4,5].map((val, ind) => (
                              (item.rate >= val) && <i key={ind} class="glyphicon glyphicon-star-empty"></i>
                            ))                            
                          }
                        </span>
                        <span className="comment">
                          {item.comment}
                        </span>
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

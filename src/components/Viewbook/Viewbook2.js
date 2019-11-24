import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import API from "../../utils/API";
import "react-datepicker/dist/react-datepicker.css";
import "./Viewbook.css";
import { Grid, Row, Col, Image, Breadcrumb, Panel, Label, Modal} from 'react-bootstrap';
import img from '../../Images/rumî.jpg';

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
      console.log(data)
      this.setState({users: data});
    });
    this.getBook(this.state.idBook).then(data => {
      const err = { err: false, httpCode: null, auth: true };
      this.setState({ books: data.books[0], err: err });
    }).catch(err=> {
      this.setState({err: err});
    });
  };

  addComment = () => {
    console.log('Add a comment');
    this.setState({ show: true });
  }

  render() {
    console.log(this.props);
    const { title, author, publishedDate, description, links, rating } = this.state.books;
    return (
      <div className="Viewbook">
        <Breadcrumb>
          {/* <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item> */}
          <Breadcrumb.Item href="/dashboard/admin/books">
            Books
          </Breadcrumb.Item>
          <Breadcrumb.Item active>View</Breadcrumb.Item>
        </Breadcrumb>
        <Grid>
          <Row className="show-grid">
            <Col xs={12} md={4} className="divImg">
             <Image src={img} rounded />
            </Col>
            <Col xs={6} md={8} className="divData">
              <Panel className="panel-primary">
                <Panel.Body>
                  <h2>
                    <div class="panelA"><Label>Titre</Label>{title}</div>
                    <div class="panelA"><Label>Auteur</Label>{author}</div>
                    <div class="panelA"><Label>Date</Label>{new Date(publishedDate).toLocaleDateString()}</div>
                    <div class="panelA"><Label>Description</Label>{description}</div>
                    <div class="panelA"><Label>Liens</Label>
                      <ul className="links">
                        {links.map((item, index) => (
                            <li key={index}>
                                + {item.name}&nbsp;({item.link})
                            </li>
                        ))} 
                      </ul>
                    </div>
                  </h2>
                </Panel.Body>
              </Panel>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12} md={12} className="divImg">
               <Panel className="panel-primary">
                {/* <Panel.Heading>Commentaires<i class="glyphicon glyphicon-plus-sign" onClick={() => this.addComment()}></i></Panel.Heading> */}
                <Panel.Body className="comment">
                  <ul className="links">
                      {rating.map((item, i) => (
                          <li key={i}>
                              <div>
                                {this.state.users.map((user, k) => (
                                  (user.id == item.userId) && user.name
                                ))}
                                {/* {item.userId} */}
                              </div>
                              <div>Note:&nbsp;
                                {
                                  [1,2,3,4,5].map((val, ind) => (
                                    (item.rate >= val) && <i key={ind} class="glyphicon glyphicon-star-empty"></i>
                                  ))                            
                                }
                              </div>
                              <div>{item.comment}</div>
                          </li>
                      ))} 
                    </ul>
                </Panel.Body>
              </Panel>
            </Col>
          </Row> 
          <Row>
            <div className="modal-container" style={{ height: 200 }}>
              <Modal
              show={this.state.show}
              onHide={this.handleHide}
              container={this}
              aria-labelledby="contained-modal-title"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title">
                    Contained Modal
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Elit est explicabo ipsum eaque dolorem blanditiis doloribus sed id
                  ipsam, beatae, rem fuga id earum? Inventore et facilis obcaecati.
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={this.handleHide}>Close</Button>
                </Modal.Footer>
              </Modal>
            </div>
          </Row>
        </Grid>
        
      </div>
    )
  }
}

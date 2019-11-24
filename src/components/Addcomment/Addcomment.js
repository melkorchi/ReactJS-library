import React from "react";
import { Button, FormGroup, FormControl, ControlLabel, Breadcrumb, Grid, Row, Col } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import API from "../../utils/API";
import "react-datepicker/dist/react-datepicker.css";
import "./Addcomment.css";
import Select from 'react-select';

import fr from "date-fns/locale/fr"; // the locale you want
registerLocale("fr", fr); // register it with the name you want

const options = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' }
];

export class Addcomment extends React.Component {
   constructor(props, context) {
    super(props, context);
    // console.log(this.props.userId);
    this.state = {
      rate: 0,
      comment: "",
      userId: this.props.userId,
      idBook: this.props.match.params.idBook,
      update: false,
      errors: {
        rate: "",
        comment: ""
      }
    }
  }


  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  // isYetCommented = async(idBook, userId) => {
  //   return await API.findByCommentIdUser(idBook, userId).lenght;
  // }

  findByCommentIdUser = async(idBook, userId) => {
    return await API.findByCommentIdUser(idBook, userId);
  }

  handleSelectChange = (selectedOption) => {
    this.setState({ rate: selectedOption.value });
  };

  handleAdd = async(e) => {
    console.log(this.state);
    e.preventDefault();
    const { idBook, rate, comment, userId } = this.state;
    try {
      console.log(this.state);
      // return;
      // Vérifier si cet user n'a pas déjà commenté ce livre
      // const books = await API.findByCommentIdUser(idBook, userId);
      // console.log(books);
      // Si oui lui proposer de le modifier

      // let data = null;
      // if (this.isYetCommented) {
      //   // modif
      //   data = await API.updateComment(idBook, rate, comment, userId);
      // } else {
      //   data  = await API.addComment(idBook, rate, comment, userId);
      // }
      
      const data  = await API.addComment(idBook, rate, comment, userId);
      window.location = `/dashboard/admin/books/view/${this.state.idBook}`;
    } catch (error) {
      console.error(error);
      // Action ???
    }
  }

  handleEdit = async(e) => {
    e.preventDefault();
    const { idBook, rate, comment, userId } = this.state;
    try {
      const result = await API.updateComment(idBook, rate, comment, userId);
      console.log('result updateComment', result);
      window.location = `/dashboard/admin/books/view/${idBook}`;
    } catch (error) {
      console.error(error);
    }
  }

  handleRemove = async(e) => {
    e.preventDefault();
    const { idBook, userId } = this.state;
    try {
      const result = await API.removeComment(idBook, userId);
      console.log('result removeComment', result);
      window.location = `/dashboard/admin/books/view/${idBook}`;
    } catch (error) {
      console.error(error);
    }
      
  }

  componentDidMount() {
    // this.setState({update: this.isYetCommented(this.state.idBook, this.state.userId)})
    console.log('componentDidMount')
  }

  componentWillMount() {
    console.log('componentWillMount')
    // return this.findByCommentIdUser(this.state.idBook, this.state.userId).then(res => {
    //       console.log('res', res);
    //       const update = (res.length < 1) ? false : true;
    //       this.setState({update: update});
    //     });
  }
 
  // Récupération de la prop !!!
  componentDidUpdate(previousProps, previousState) {
    console.log('componentDidUpdate')
    if (previousProps.userId !== this.props.userId) {
        this.setState({userId: this.props.userId});
        // this.setState({update: this.isYetCommented(this.state.idBook, this.state.userId)});
        this.findByCommentIdUser(this.state.idBook, this.props.userId).then(res => {
          console.log('res', res);
          const update = (res.length < 1) ? false : true;
          this.setState({update: update});
        });
    }
  }

  render() {
    const { rate, comment, update } = this.state;
    console.log(this.state)
    
    return (
      <div className="Addcomment">
         <Breadcrumb>
          <Breadcrumb.Item href="/dashboard/admin/books">
            Books
          </Breadcrumb.Item>
           <Breadcrumb.Item href={`/dashboard/admin/books/view/${this.state.idBook}`}>
            View
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Add Comment</Breadcrumb.Item>
        </Breadcrumb>
        <Grid>
          <Row className="show-grid">
            <Col xs={12} sm={12} md={8} mdOffset={2}>
              <FormGroup controlId="rate" bsSize="large">
                <ControlLabel>Rate</ControlLabel>
                <Select options = {options} onChange={this.handleSelectChange} autoFocus={true} />
              </FormGroup> 

              <FormGroup controlId="comment" bsSize="large">
                <ControlLabel>Commentaire</ControlLabel>
                <textarea
                  className="form-control"
                  id="comment"
                  rows="5"
                  placeholder="Commenter le livre"
                  onChange={this.handleChange}
                />
              </FormGroup>

              <div className="well">
                {
                  (!update) &&<Button onClick={this.handleAdd} bsStyle="primary" block bsSize="large" type="submit">
                  Ajouter votre commentaire
                </Button>
                }
                {
                  (update) && <div><Button onClick={this.handleEdit} bsStyle="primary" block bsSize="large" type="submit">
                    Modifer votre commentaire
                  </Button>
                  <Button onClick={this.handleRemove} bsStyle="danger" block bsSize="large" type="submit">
                    Supprimer votre commentaire
                  </Button></div>
                }
              </div>
              

            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

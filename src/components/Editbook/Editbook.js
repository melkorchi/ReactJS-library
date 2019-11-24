import React from "react";
import { Button, FormGroup, FormControl, ControlLabel, Breadcrumb, Grid, Row, Col } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import Select from 'react-select';
import API from "../../utils/API";
import "react-datepicker/dist/react-datepicker.css";
import "./Editbook.css";
// import "./../Addbook/Addbook.css";

import fr from "date-fns/locale/fr"; // the locale you want
registerLocale("fr", fr); // register it with the name you want

const options = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' }
];

export class Editbook extends React.Component {
  state = {
    title: "",
    author: "",
    publishedDate: new Date(), 
    description: "",
    urlImage: "",
    rate:"",
    comment:"",
    userId: null,
    idBook: this.props.match.params.idBook,
    name:"",
    link:"",
    rating:[],
    defaut:{ label: "3", value: "3" },
    links: [
      {name: "Amazon", link: "http://www.amazon.fr"}
    ],
    errors: {
      title: "",
      author: "",
      publishedDate: "", 
      description: "",
      rate:"",
      comment:""
    }
  }

  async getBook (id) {
    return await API.getBook(id);
  };

  componentWillReceiveProps() {
  }

  componentWillUpdate(previousProps) {
    console.log('A');
    if (previousProps.userId !== this.props.userId) {
        this.setState({userId: this.props.userId});
    }
  }

  componentWillMount() {
  }

  getidUserRateAndComment(rating) {
    rating.map((item, index)=> {
      // console.log('item', item.userId)
      // console.log('item-id', this.state.userId)
      if (parseInt(item.userId) === parseInt(this.state.userId)) {
        console.log('comment', item.comment)
        console.log('rate', item.rate)
        this.setState({
          comment: item.comment, 
          rate: item.rate,
          oldCommentDate: item.commentPublicationDate,
          defaut: {
            label: String(item.rate), 
            value: String(item.rate)
          },
          oldComment: item.comment
        });
      }
    });
  }

  componentDidMount() {
     this.setState({userId: this.props.userId});
     
     this.getBook(this.state.idBook).then(data => {
      console.log('data', data);
      const err = { err: false, httpCode: null, auth: true };

      this.setState({ 
        book: data.books[0],
        title: data.books[0].title,
        author: data.books[0].author,
        publishedDate: new Date(data.books[0].publishedDate), 
        description: data.books[0].description,
        rating: data.books[0].rating,
        links: data.books[0].links,
        err: err 
      });
    }).catch(err=> {
      this.setState({err: err});
    });
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.rating !== this.state.rating) {
        this.getidUserRateAndComment(this.state.rating);  
    }
  }

  handleDateChange = date => {
    this.setState({
      publishedDate: date
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  edit = async(e) => {
    console.log(this.state);
    e.preventDefault();
    const { title, author, publishedDate, description, urlImage, rate, comment, userId, links, idBook , oldComment, oldCommentDate } = this.state;
    const isNewComment = (comment === oldComment) ? false : true;
    try {
      const data  = await API.updateBook(title, author, publishedDate, urlImage, description, rate, comment, userId, links, idBook, oldCommentDate, isNewComment);
      window.location = `/dashboard/admin/books/view/${idBook}`;
    } catch (error) {
      console.error(error);
    }
  }

  removeLink = (selectedItem) => {
    console.log("remove");
    console.log(selectedItem);
    const { links } = this.state;
    const newLinks = [ ...links ];
    const itemIndex = newLinks.findIndex(item => item.name === selectedItem.name);

    if (itemIndex > -1) {
      newLinks.splice(itemIndex, 1);
    } 

    this.setState({
      links: newLinks,
    })
  }

  addLink = () => {
    const {name, link, links} = this.state;
    const newLinks = [ ...links ];
    const itemIndex = newLinks.findIndex(item => item.name === name);
    if (itemIndex > -1) {
      newLinks.splice(itemIndex, 1, {name: name, link: link});
    } else {
      newLinks.push({name: name, link: link});
    }

    this.setState({links:newLinks});
  }

  handleLinkChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSelectChange = (selectedOption) => {
    this.setState({ rate: selectedOption.value });
  };

  render() {
    console.log(this.state);
    // console.log(this.props);
    // this.setState({userId: this.props.userId});
    // this.getidUserRateAndComment(this.state.rating);
    // console.log(this.state);
     
    const {title, author, publishedDate, description, urlImage, rate, comment, name, link, links, defaut, book} = this.state;
    
    return (
      <div className="Addbook">
        <Breadcrumb>
          <Breadcrumb.Item href="/dashboard/admin/books">
            Books
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Edit</Breadcrumb.Item>
        </Breadcrumb>
        <Grid>
          <Row className="show-grid">
            <Col xs={12} sm={12} md={8} mdOffset={2} >
              <FormGroup controlId="title" bsSize="large">
                <ControlLabel>Titre</ControlLabel>
                <FormControl
                  autoFocus
                  type="text"
                  value={title}
                  onChange={this.handleChange}
                  placeholder="Titre du livre"
                  required
                />
              </FormGroup>
              <FormGroup controlId="author" bsSize="large">
                <ControlLabel>Auteur</ControlLabel>
                <FormControl
                  autoFocus
                  type="text"
                  value={author}
                  onChange={this.handleChange}
                  placeholder="Auteur du livre"
                  required
                />
              </FormGroup>
              <label htmlFor="">Date de publication</label>
              <DatePicker
                  locale="fr"
                  dateFormat="dd/MM/yyyy"
                  // selected={this.state.publishedDate}
                  selected={publishedDate}
                  onChange={this.handleDateChange}
                />
              <FormGroup controlId="description" bsSize="large">
                <ControlLabel>Description</ControlLabel>
                <textarea
                  className="form-control"
                  id="description"
                  rows="5"
                  placeholder="Description du livre"
                  onChange={this.handleChange}
                  value={description}
                />
              </FormGroup>
              <FormGroup controlId = "urlImage" bsSize = "large">
                  <ControlLabel> Url image </ControlLabel> 
                  <FormControl 
                      autoFocus 
                      type = "text"
                      value = { urlImage }
                      onChange = { this.handleChange }
                      placeholder = "http://pathToImage"
                      required 
                  />
              </FormGroup> 
              <FormGroup controlId="rate" bsSize="large">
                <ControlLabel>Rate</ControlLabel>
                <Select 
                  options = {options} 
                  onChange={this.handleSelectChange} 
                  autoFocus={true} 
                  defaultValue={defaut}
                />
              </FormGroup> 
              <FormGroup controlId="comment" bsSize="large">
                <ControlLabel>Commentaire</ControlLabel>
                <textarea
                  className="form-control"
                  id="comment"
                  rows="5"
                  placeholder="Commentaire du livre"
                  value={comment}
                  onChange={this.handleChange}
                />
              </FormGroup>

              <ControlLabel>Lien(s)</ControlLabel>
              <div className="well">
                <table className="links">
                  {links.map((item, index) => (
                    <tr key={index}>
                      <td className="add-book" >{item.name}</td>
                      <td className="add-book">{item.link}</td>
                      <td className="add-book">
                        <Button id={item.name} className="btn-remove" onClick={() => this.removeLink(item)} bsStyle="danger" bsSize="small" type="submit">Supprimer
                        </Button>
                      </td>
                    </tr>
                   ))}
                </table>
              </div>

              <FormGroup controlId="name" bsSize="large">
                <FormControl
                  name="name"
                  autoFocus
                  type="text"
                  value={name}
                  placeholder="Amazon"
                  // required
                  // ref={(c) => this.state.name = c}
                  onChange={this.handleLinkChange}
                />
              </FormGroup>
              <FormGroup controlId="link" bsSize="large">
                <FormControl
                  name="link"
                  autoFocus
                  type="text"
                  value={link}
                  placeholder="http://wwww.amazon.fr"
                  // required
                  // ref={(c) => this.state.link = c}
                  onChange={this.handleLinkChange}
                />
              </FormGroup>
             </Col>
            </Row>
            <Row className="show-grid">
              <Col xs={12} sm={12} md={8} mdOffset={2} >
              <div className="well groupe-btn">
                <Button onClick={this.addLink} bsStyle="warning" bsSize="large" block>
                  Ajouter un lien
                </Button>
                <Button onClick={this.edit} bsStyle="success" bsSize="large" block>
                  Editer le livre
                </Button>
              </div>

            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

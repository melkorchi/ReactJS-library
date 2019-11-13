import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import DatePicker from "react-datepicker";
// import {MarkdownTextarea}  from "react-markdown-textarea";
import API from "../../utils/API";
import "react-datepicker/dist/react-datepicker.css";
import "./Addbook.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "bootstrap-css-only/css/bootstrap.min.css";

export class Addbook extends React.Component {
  state = {
    title: "",
    author: "",
    publishedDate: new Date(), 
    description: "",
    rate:"",
    comment:"",
    userId:localStorage.getItem("userId"),
    listofdata: [
      {name: "toto"},
      {name: "tata"},
      {name: "titi"},
      {name: "tutu"},
      {name: "tyty"},
      {name: "tktk"}
    ],
    name:"",
    link:"",
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

  handleDateChange = date => {
    this.setState({
      publishedDate: date
    });
  };
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  add = async(e) => {
    console.log(this.state);
    e.preventDefault();
    const { title, author, publishedDate, description, rate, comment, userId, links } = this.state;
    try {
      const data  = await API.addBook(title, author, publishedDate, description, rate, comment, userId, links);
      // console.log(data);
      window.location = "/dashboard/admin/books";
    } catch (error) {
      console.error(error);
    }
  };
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

  };
  addLink = () => {
    console.log("add");
    const {name, link, links} = this.state;
    const newLinks = [ ...links ];
    const itemIndex = newLinks.findIndex(item => item.name === name);
     if (itemIndex > -1) {
      newLinks.splice(itemIndex, 1, {name: name, link: link});
    } else {
      newLinks.push({name: name, link: link});
    }

    this.setState({links:newLinks});
  };
  handleLinkChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  render() {
    console.log(this.state);
    const {title, author, publishedDate, description, rate, comment, name, link, links} = this.state;
    return (
      <div className="Addbook">
      {/* <div className = "balise-root"> */}
        <h3>Ajouter un livre</h3>
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
            selected={this.state.publishedDate}
            onChange={this.handleDateChange}
          />
        <FormGroup controlId="description1" bsSize="large">
          <ControlLabel>Description</ControlLabel>
          <textarea
            className="form-control"
            id="description"
            rows="5"
            placeholder="Description du livre"
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="rate" bsSize="large">
        <ControlLabel>Note</ControlLabel>
        <FormControl
          autoFocus
          type="text"
          value={rate}
          onChange={this.handleChange}
          placeholder="Donnez une note"
          required
        />
        </FormGroup>
        <FormGroup controlId="comment1" bsSize="large">
          <ControlLabel>Commentaire</ControlLabel>
          <textarea
            className="form-control"
            id="comment"
            rows="5"
            placeholder="Commentaire du livre"
            onChange={this.handleChange}
          />
        </FormGroup>

        {links.map((item, index) => (
          <ul className="links">
            <li key={index} onClick={() => {}}>
              <div>
                <span>{item.name}&nbsp;&nbsp;&nbsp;{item.link}</span>
                <Button id={item.name} className="removeLink" onClick={() => this.removeLink(item)} bsStyle="danger" bsSize="small" type="submit">Supprimer</Button>
              </div>
            </li>
          </ul>
        ))} 
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
        <Button onClick={this.addLink} block bsStyle="primary" bsSize="medium" type="submit">
          Ajouter un lien
        </Button>

        <Button onClick={this.add} block bsSize="large" type="submit">
          Ajouter le livre
        </Button>
      </div>
    )
  }
}

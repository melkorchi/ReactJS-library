import React from "react";
import { Button, FormGroup, FormControl, ControlLabel, Breadcrumb, Grid, Row, Col } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
// import {MarkdownTextarea}  from "react-markdown-textarea";
import Select from 'react-select';
import API from "../../utils/API";
import "react-datepicker/dist/react-datepicker.css";
import "./Addbook.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "bootstrap-css-only/css/bootstrap.min.css";

import fr from "date-fns/locale/fr"; // the locale you want
registerLocale("fr", fr); // register it with the name you want

const options = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' }
];

export class Addbook extends React.Component {
    state = {
        title: "",
        author: "",
        publishedDate: new Date(),
        description: "",
        urlImage: "",
        rate: "",
        comment: "",
        userId: this.props.userId,
        username: this.props.username,
        name: "",
        link: "",
        links: [
            { name: "Amazon", link: "http://www.amazon.fr" }
        ],
        errors: {
            title: "",
            author: "",
            publishedDate: "",
            // urlImage: "",
            description: "",
            rate: "",
            comment: ""
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

    add = async(e) => {
        console.log(this.state);
        e.preventDefault();
        const { title, author, publishedDate, urlImage, description, rate, comment, userId, links } = this.state;
        try {
            const data = await API.addBook(title, author, publishedDate, urlImage, description, rate, comment, userId, links);
            window.location = "/dashboard/admin/books";
        } catch (error) {
            // console.error(error);
        }
    }

    removeLink = (selectedItem) => {
        console.log("remove");
        console.log(selectedItem);
        const { links } = this.state;
        const newLinks = [...links];
        const itemIndex = newLinks.findIndex(item => item.name === selectedItem.name);

        if (itemIndex > -1) {
            newLinks.splice(itemIndex, 1);
        }

        this.setState({
            links: newLinks,
        })
    }

    addLink = () => {
        const { name, link, links } = this.state;
        const newLinks = [...links];
        const itemIndex = newLinks.findIndex(item => item.name === name);
        if (itemIndex > -1) {
            newLinks.splice(itemIndex, 1, { name: name, link: link });
        } else {
            newLinks.push({ name: name, link: link });
        }

        this.setState({ links: newLinks });
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
        const { title, author, publishedDate, description, urlImage, rate, comment, name, link, links } = this.state;
        return ( 
            <div className = "Addbook" >
            <Breadcrumb >
                <Breadcrumb.Item href = "/dashboard/admin/books" >Books </Breadcrumb.Item> 
                <Breadcrumb.Item active > Add </Breadcrumb.Item> 
            </Breadcrumb> 
            <Grid>
                <Row className = "show-grid">
                    <Col xs = { 12 } sm = { 12 } md = { 8 } mdOffset = { 2 }>
                        <FormGroup controlId = "title" bsSize = "large">
                            <ControlLabel> Titre </ControlLabel> 
                            <FormControl 
                                autoFocus type = "text" 
                                value = { title } 
                                onChange = { this.handleChange }
                                placeholder = "Titre du livre"
                                required 
                            />
                        </FormGroup> 
                        <FormGroup controlId = "author" bsSize = "large">
                            <ControlLabel> Auteur </ControlLabel> 
                            <FormControl 
                                autoFocus 
                                type = "text"
                                value = { author }
                                onChange = { this.handleChange }
                                placeholder = "Auteur du livre"
                                required 
                            />
                        </FormGroup> 
                        <label htmlFor = ""> Date de publication </label> 
                        <DatePicker 
                            locale = "fr"
                            dateFormat = "dd/MM/yyyy"
                            selected = { this.state.publishedDate }
                            onChange = { this.handleDateChange }
                        /> 
                        <FormGroup controlId = "description1" bsSize = "large">
                            <ControlLabel> Description </ControlLabel> 
                            <textarea className = "form-control"
                                id = "description"
                                rows = "5"
                                placeholder = "Description du livre"
                                onChange = { this.handleChange }
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
                        <FormGroup controlId = "rate" bsSize = "large">
                            <ControlLabel> Rate </ControlLabel> 
                            <Select 
                                options = { options }
                                onChange = { this.handleSelectChange }
                                autoFocus = { true }
                            /> 
                        </FormGroup>  
                        <FormGroup controlId = "comment1" bsSize = "large">
                            <ControlLabel > Commentaire </ControlLabel> 
                            <textarea 
                                className = "form-control"
                                id = "comment"
                                rows = "5"
                                placeholder = "Commentaire du livre"
                                onChange = { this.handleChange }
                            /> 
                        </FormGroup>

                        <ControlLabel > Lien(s) </ControlLabel> 
                        <div className = "well">
                            <table className = "links" > 
                            {
                                links.map((item, index) => ( 
                                <tr key = { index }>
                                    <td className = "add-book"> { item.name } </td> 
                                    <td className = "add-book"> { item.link } </td> 
                                    <td className = "add-book">
                                    <Button id = { item.name } className = "btn-remove" onClick = {() => this.removeLink(item)} bsStyle="danger" bsSize="small" type="submit">      Supprimer 
                                    </Button> 
                                    </td> 
                                </tr>
                                ))
                            } 
                            </table> 
                        </div>

                    <FormGroup controlId = "name" bsSize = "large">
                        <FormControl name = "name"
                            autoFocus type = "text"
                            value = { name }
                            placeholder = "Amazon"
                            // required
                            // ref={(c) => this.state.name = c}
                            onChange = { this.handleLinkChange }
                        /> 
                    </FormGroup> 
                    <FormGroup controlId = "link" bsSize = "large" >
                        <FormControl name = "link"
                            autoFocus type = "text"
                            value = { link }
                            placeholder = "http://wwww.amazon.fr"
                            // required
                            // ref={(c) => this.state.link = c}
                            onChange = { this.handleLinkChange }
                        /> 
                    </FormGroup> 
                </Col> 
            </Row> 
            <Row className = "show-grid" >
                <Col xs = { 12 } sm = { 12 } md = { 8 } mdOffset = { 2 }>
                    <div className = "well groupe-btn" >
                        <Button onClick = { this.addLink }
                            bsStyle = "primary"
                            bsSize = "large"
                            block 
                        >
                            Ajouter un lien 
                        </Button> 
                        <Button onClick = { this.add }
                            bsStyle = "primary"
                            bsSize = "large"
                            block 
                        >
                            Ajouter le livre 
                        </Button> 
                    </div>
                </Col> 
            </Row> 
        </Grid> 
    </div>
    )
    }
}
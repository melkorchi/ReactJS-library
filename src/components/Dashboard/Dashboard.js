import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";

import API from "../../utils/API";
import Adminbooks from "../Adminbooks/Adminbooks";
// import MenuContainer  from "../MenuContainer/MenuContainer";
import Slidemenu  from "../Slidemenu/Slidemenu";
// import MenuContainer  from "../MenuContainer/MenuContainer";

import './Dashboard.css';

export class Dashboard extends React.Component {
  state = {
    books: []
  }
  books = {};
  disconnect = () => {
    API.logout();
    window.location = "/";
  };
  async getBooks () {
    // const {data} = await API.getBooks();
    return await API.getBooks();
    // const data = await API.getBooks();
    // return data.books;
  };
  async componentWillMount(){
    await this.getBooks().then(data => {
      // console.log(data);
      this.setState({books: data});
    })
  }
  componentDidMount(){
    console.log('Did');
  }
  render() {
    const {books} = this.state;
    // console.log(books);
    return (
      <div className="Dashboard">
        <Slidemenu title='Dashboard'/>
        {/* <Switch></Switch> */}
        <Adminbooks className="Adminbook" books={books} />
      </div>
    );
  }
}
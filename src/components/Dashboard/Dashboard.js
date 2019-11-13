import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import API from "../../utils/API";
// import { Adminbooks } from "../Adminbooks/Adminbooks.js";
import Adminbooks from "../Adminbooks/Adminbooks";
import Adminusers from "../Adminusers/Adminusers";
import Adminlogs from "../Adminlogs/Adminlogs";
import Slidemenu  from "../Slidemenu/Slidemenu";
import { Addbook } from "../Addbook/Addbook.js";

import './Dashboard.css';
import Nomatch from "../Nomatch/Nomatch";

export class Dashboard extends React.Component {
  state = {
    books: []
  }

  disconnect = () => {
    API.logout();
    window.location = "/";
  };

  async getBooks () {
    return await API.getBooks();
  };

  async componentWillMount(){
    await this.getBooks().then(data => {
      this.setState({books: data});
    })
  };

  componentDidMount(){
    console.log('Did');
  };

  render() {
    const {books} = this.state;
    console.log(books);
    return (
      <BrowserRouter>
      <div className="Dashboard">
        <Slidemenu title='Dashboard'/>
        <Switch>
          <Route exact path="/dashboard/admin/books" render={()=><Adminbooks books={books}/>} />
          <Route exact path="/dashboard/admin/users" render={()=><Adminusers />} />
          <Route exact path="/dashboard/admin/logs" render={()=><Adminlogs />} />
          <Route exact path="/dashboard/admin/books/add" render={()=><Addbook />} />
          <Route component={Nomatch} />
        </Switch>
        {/* <Adminbooks className="Adminbook" books={books} /> */}
      </div>
      </BrowserRouter>
    );
  }
}
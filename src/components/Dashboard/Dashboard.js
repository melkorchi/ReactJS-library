import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import API from "../../utils/API";

import { Adminbooks } from "../Adminbooks/Adminbooks.js";
// import Adminbooks from "../Adminbooks/Adminbooks";

// import Adminusers from "../Adminusers/Adminusers";
import { Adminusers } from "../Adminusers/Adminusers";

// import Adminlogs from "../Adminlogs/Adminlogs";
import { Adminlogs } from "../Adminlogs/Adminlogs";

import Slidemenu  from "../Slidemenu/Slidemenu";
import { Addbook } from "../Addbook/Addbook.js";
import { Removebook } from "../Removebook/Removebook.js";
import { Editbook } from "../Editbook/Editbook.js";
import { Adduser } from "../Adduser/Adduser.js";
import { Addlog } from "../Addlog/Addlog.js";
import { Userbooks } from "../Userbooks/Userbooks.js";
import { Viewbook } from "../Viewbook/Viewbook.js";
import { Addcomment } from "../Addcomment/Addcomment.js";
import { Removelog } from "../Removelog/Removelog.js";
import { Editlog } from "../Editlog/Editlog.js";
import { Edituser } from "../Edituser/Edituser.js";
import { Removeuser } from "../Removeuser/Removeuser.js";
import { BarChart } from "../BarChart/BarChart.js";
import { PieChart } from "../PieChart/PieChart.js";

import './Dashboard.css';
import Nomatch from "../Nomatch/Nomatch";
import Forbidden from "../Forbidden/Forbidden";

export class Dashboard extends React.Component {
  state = {
    // books: [],
    // users: [],
    // logs: []
  }

  disconnect = () => {
    API.logout();
    window.location = "/";
  };

  // async getBooks () {
  //   return await API.getBooks();
  // };

  // async getUsers () {
  //   return await API.getUsers();
  // };

  // async getLogs () {
  //   return await API.getLogs();
  // };

  // async componentWillMount(){
  //   await this.getBooks().then(data => {
  //     this.setState({books: data});
  //   })
  // };

  async getInfosUser () {
    return await API.getInfosUser();
  };

  // Test
  componentWillMount(){
    // this.getBooks().then(data => {
    //   this.setState({books: data});
    // });
    // this.getUsers().then(data => {
    //   // console.log(data)
    //   this.setState({users: data});
    // });
    // this.getLogs().then(data => {
    //   this.setState({logs: data});
    // });
  };

  componentDidMount() {
    // this.getUsers().then(data => {
    //   // console.log(data)
    //   this.setState({users: data});
    // });
    this.getInfosUser().then(data => {
      console.log(data.data)
      this.setState({role: data.data.user[0].role, userId: data.data.user[0].id, username: data.data.user[0].name});
    });
  };

  isAdmin = () => {
    return (this.state.role === 'ROLE_ADMIN');
  }

  render() {
    // const {books, users, logs} = this.state;
    // console.log(books);
    // console.log(users);
    // console.log(this.state.users);
    return (
      <div className="Dashboard">
        <Slidemenu title='Dashboard'/>
        <Switch>
          {/* <Route exact path="/dashboard/admin/books" render={()=><Adminbooks books={books}/>} /> */}
          <Route exact path="/dashboard/admin/books" render={()=>(this.isAdmin()) ? <Adminbooks /> : <Userbooks />} />
          {/* <Route exact path="/dashboard/admin/books/view/:id" render={(props)=><Viewbook />} /> */}
          {/* <Route exact path="/dashboard/admin/books/view/:id" component={Viewbook} users={this.state.users} /> */}
          <Route exact path="/dashboard/admin/books/view/:id" component={Viewbook} />
          {/* <Route exact path="/dashboard/admin/books/view/:id" render={(props) => <Viewbook userId={this.state.userId} {...props} /> } /> */}


          <Route exact path="/dashboard/admin/users" render={()=>(this.isAdmin()) ? <Adminusers /> : <Forbidden />} />
          {/* <Route exact path="/dashboard/admin/users" render={()=><Adminusers users={users}/>} /> */}
          {/* <Route exact path="/dashboard/admin/users" render={()=>(API.isAuth() ? <Adminusers /> : <Forbidden />)} /> */}

          <Route exact path="/dashboard/admin/logs" render={()=>(this.isAdmin()) ? <Adminlogs /> : <Forbidden />} />
          {/* <Route exact path="/dashboard/admin/logs" render={()=><Adminlogs logs={logs}/>} /> */}
          {/* <Route exact path="/dashboard/admin/logs" render={()=>(API.isAuth() ? <Adminlogs /> : <Forbidden />)} /> */}

          <Route exact path="/dashboard/admin/books/add" render={()=>(this.isAdmin()) ? <Addbook userId={this.state.userId} username={this.state.username} isEdit={false} /> : <Forbidden />} />
          {/* <Route exact path="/dashboard/admin/books/add" render={()=>(API.isAuth() ? <Addbook /> : <Forbidden />)} /> */}

          <Route exact path="/dashboard/admin/books/edit/:idBook" render={(props)=>(this.isAdmin()) ? <Editbook userId={this.state.userId} {...props} /> : <Forbidden /> } />

          <Route exact path="/dashboard/admin/books/remove/:idBook" render={(props)=>(this.isAdmin()) ? <Removebook userId={this.state.userId} {...props} /> : <Forbidden />} />

          {/* <Route exact path={`/dashboard/admin/books/comment/add/:idBook`} component={Addcomment} /> */}
          <Route exact path="/dashboard/admin/books/comment/add/:idBook" render={(props) => <Addcomment userId={this.state.userId} {...props} /> } />

          <Route exact path="/dashboard/admin/users/add" render={()=>(this.isAdmin()) ? <Adduser /> : <Forbidden />} />
          <Route exact path="/dashboard/admin/users/edit/:idUser" render={(props)=>(this.isAdmin()) ? <Edituser {...props} /> : <Forbidden />} />
          <Route exact path="/dashboard/admin/users/remove/:idUser" render={(props)=>(this.isAdmin()) ? <Removeuser {...props} /> : <Forbidden />} />

          <Route exact path="/dashboard/admin/logs/add" render={()=>(this.isAdmin()) ? <Addlog /> : <Forbidden />} />
          {/* <Route exact path="/dashboard/admin/logs/add" render={()=>(API.isAuth() ? <Addlog /> : <Forbidden />)} /> */}
          <Route exact path="/dashboard/admin/logs/remove/:idLog" render={(props)=>(this.isAdmin()) ? <Removelog userId={this.state.userId} {...props} /> : <Forbidden />} />
          <Route exact path="/dashboard/admin/logs/edit/:idLog" render={(props)=>(this.isAdmin()) ? <Editlog userId={this.state.userId} {...props} /> : <Forbidden /> } />

          <Route exact path="/dashboard/admin/logs/reporting/barchart" render={()=>(this.isAdmin()) ? <BarChart /> : <Forbidden />} />
          <Route exact path="/dashboard/admin/logs/reporting/piechart" render={()=>(this.isAdmin()) ? <PieChart /> : <Forbidden />} />

          <Route component={Nomatch} />
        </Switch>
        {/* <Adminbooks className="Adminbook" books={books} /> */}
      </div>
    );
  }
}
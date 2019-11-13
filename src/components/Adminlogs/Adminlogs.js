import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./Adminlogs.css";
// import Search from "../Search/Search";
import {Search} from "../Search/Search"; // With class

const Adminlogs = () => (

  <div className = "Adminlogs">
    <Search></Search>
    <h3>Dashboard Logs</h3>
  </div>
)

function handleClick() {
  // e.preventDefault();
  window.location = '/dashboard/admin/logs/add';
}

export default Adminlogs;

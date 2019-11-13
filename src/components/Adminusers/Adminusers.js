import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./Adminusers.css";
// import Search from "../Search/Search";
import {Search} from "../Search/Search"; // With class

const Adminusers = () => (

  <div className = "Adminusers">
    <Search></Search>
    
    <h3>Dashboard Users</h3>
  </div>
)

function handleClick() {
  // e.preventDefault();
  window.location = '/dashboard/admin/users/add';
}

export default Adminusers;


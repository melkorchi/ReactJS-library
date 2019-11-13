import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdbreact/dist/css/mdb.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

import React from "react";
// import { MDBCol } from "mdbreact";

import { MDBCol, MDBIcon } from "mdbreact";
import API from "../../utils/API";

// import React from "react";
// import { MDBCol, MDBInput } from "mdbreact";

// const Search = () => {
//   return (
//     <MDBCol md="6">
//       <MDBInput hint="Search" type="text" containerClass="active-pink active-pink-2 mt-0 mb-3" />
//     </MDBCol>
//   );
// }

// export default Search;

// const handleClick = (e) => {
//   console.log(e.target.id)

// }

// const Search = () => {
//   return (
//     <MDBCol md="12">
//       <div className="active-pink-3 active-pink-4 mb-4">
//         <input id="search" className="form-control" type="text" placeholder="Search" aria-label="Search" />
//         <Button onClick={(e) => handleClick(e)} value="" bsSize="small" bsStyle="primary" type="submit">
//           Go
//         </Button>
//       </div>
//     </MDBCol>
//   );
// }


// const Search = () => {
  export class Search extends React.Component {
  
  state = {
    search: ""
  }

  handleChange = (e) => {
    this.setState({
      search: e.target.value
    });
  }

  handleClick = (e) => {
    console.log('click', this.state);
    // const books = API.searchBooks(this.state.search, this.state.search);
    const books = API.searchBooks(this.state.search);
    console.log(books);
  }
  
  render() {
    const {search} = this.state;
    console.log(this.state);
    return (
      <MDBCol md="6">
        <div className="input-group md-form form-sm form-1 pl-0">
          <div className="input-group-prepend">
            <span className="input-group-text purple lighten-3" id="basic-text1">
              <MDBIcon className="text-white" icon="search" onClick={this.handleClick} />
            </span>
          </div>
          <input className="form-control my-0 py-1" type="text" value={search} onChange={this.handleChange} placeholder="Search" aria-label="Search" />
        </div>
      </MDBCol>
    );
  }
}

// export default Search;
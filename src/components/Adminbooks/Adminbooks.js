import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./Adminbooks.css";
// import Search from "../Search/Search";
import {Search} from "../Search/Search"; // With class

const Adminbooks = ({books}) => (

  <div className = "Adminbooks">
    <Search></Search>
    <table className = "table table-striped table-hover">
      <tbody>
          <tr className="head">
            <td className="cell">id</td>
            <td className="cell">Titre</td>
            <td className="cell">Auteur</td>
            {/* <td className="cell">Description</td> */}
            <td className="cell">Date de publication</td>
            <td className="cell">Actions</td>
          </tr>
            
          {
            books.map(({ id, title, author, description, publishedDate, links }) => (
              <tr key={id}>
                <td className="cell">{id}</td>
                <td className="cell">{title}</td>
                <td className="cell">{author}</td>
                {/* <td className="cell">{description}</td> */}
                <td className="cell">{new Date(publishedDate).toLocaleDateString()}</td>
                {/* <td className="links">{links}</td> */}
                <td className="cell">
                  <Button onClick={""} bsSize="small" bsStyle="primary" type="submit">
                    Voir
                  </Button>
                  <Button onClick={""} bsSize="small" bsStyle="success" type="submit">
                    Editer
                  </Button>
                  <Button onClick={""} bsSize="small" bsStyle="danger" type="submit">
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))
          }
      </tbody> 
    </table>
    <div className="btn-add">
      <Button bsStyle="warning" onClick={handleClick.bind()} bsSize="large" type="submit">Ajouter un livre</Button>
    </div>
  </div>
)

function handleClick() {
  // e.preventDefault();
  window.location = '/dashboard/admin/books/add';
}

export default Adminbooks;

// export class Adminbooks extends React.Component { 

//   constructor(props) {
//     super(props);
//     console.log(this.props);
//   }

//   render() {
//     console.log(this.props);
//     console.log(this.state);
//     const {books} = this.props.books;
//     // console.log(books);
//     return (
//       <div className = "balise-root">
//         <table className = "table table-striped table-hover">
//           <tbody>
//                 <tr className="head">
//                   <td className="title">id</td>
//                   <td className="title">title</td>
//                   <td className="author">author</td>
//                   <td className="description">description</td>
//                   <td className="publishedDate">date de publication</td>
//                   <td className="actions">Actions</td>
//                 </tr>
              
//             {
//               books.map(({ id, title, author, description, publishedDate, links }) => (
//                 <tr key={id}>
//                   <td className="cell">{id}</td>
//                   <td className="cell">{title}</td>
//                   <td className="cell">{author}</td>
//                   <td className="cell">{description}</td>
//                   <td className="cell">{publishedDate}</td>
//                   {/* <td className="links">{links}</td> */}
//                   <td className="cell">
//                     <Button onClick={""} bsSize="small" bsStyle="primary" type="submit">
//                       View
//                     </Button>
//                     <Button onClick={""} bsSize="small" bsStyle="success" type="submit">
//                       Edit
//                     </Button>
//                     <Button onClick={""} bsSize="small" bsStyle="danger" type="submit">
//                       Remove
//                     </Button>
//                   </td>
//                 </tr>
//               ))
//             }
//           </tbody> 
//         </table>
//         <div className="btn-add"><Button bsStyle="warning" onClick={this.addBook()} bsSize="large" type="submit">Ajouter un livre</Button></div>
//       </div>
//     );
//   }
// }
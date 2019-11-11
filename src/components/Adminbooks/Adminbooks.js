import React from "react";
import { Button } from "react-bootstrap";
import "./Adminbooks.css";

const Adminbooks = ({books}) => (
  // <div className = "Bookcard" onClick={() => onClick()}>
  //   <span className="">
  //     {title} {author} {description}
  //   </span>
  // </div>
  <div className = "balise-root">
    <table className = "table table-striped table-hover">
      <tbody>
              <tr className="head">
                <td className="title">id</td>
                <td className="title">title</td>
                <td className="author">author</td>
                <td className="description">description</td>
                <td className="publishedDate">date de publication</td>
                <td className="actions">Actions</td>
              </tr>
            
          {
            books.map(({ id, title, author, description, publishedDate, links }) => (
              <tr key={id}>
                <td className="cell">{id}</td>
                <td className="cell">{title}</td>
                <td className="cell">{author}</td>
                <td className="cell">{description}</td>
                <td className="cell">{publishedDate}</td>
                {/* <td className="links">{links}</td> */}
                <td className="cell">
                  <Button onClick={""} bsSize="small" bsStyle="primary" type="submit">
                    View
                  </Button>
                  <Button onClick={""} bsSize="small" bsStyle="success" type="submit">
                    Edit
                  </Button>
                  <Button onClick={""} bsSize="small" bsStyle="danger" type="submit">
                    Remove
                  </Button>
                </td>
              </tr>
            ))
          }
      </tbody> 
    </table>
    <div className="btn-add"><Button bsStyle="warning" onClick={""} bsSize="large" type="submit">Ajouter un livre</Button></div>
  </div>
)

export default Adminbooks;
import React from "react";
import API from "../../utils/API";

class MenuLinks extends React.Component {
  constructor(props) {
    super(props);
    // Any number of links can be added here
    this.state = {
      links: [{
        text: 'Manage books',
        link: './dashboard/books',
        icon: 'fa-pencil-square-o'
      }, {
        text: 'Manage users',
        link: './dashboard/users',
        icon: 'fa-github'
      }, {
        text: 'Manage logs',
        link: './dashboard/logs',
        icon: 'fa-twitter'
      }, {
        text: 'Déconnexion',
        link: '#',
        icon: 'fa-twitter'
      }]
    }
  };
  disconnect = () => {
    API.logout();
    window.location = "/";
  };
  render() {
    let links = this.state.links.map((link, i) => <li ref={i + 1}><i aria-hidden="true" className={`fa ${ link.icon }`}></i><a href={link.link} target="_blank" onClick={link.text === 'Déconnexion' && this.disconnect}>{link.text}</a></li>);

    return (
        <div className={this.props.menuStatus} id='menu'>
          <ul>
            { links }
          </ul>
        </div>
    )
  }
}

export default MenuLinks;
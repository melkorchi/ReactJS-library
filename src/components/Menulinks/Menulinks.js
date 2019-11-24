import React from "react";
import API from "../../utils/API";

class MenuLinks extends React.Component {
  constructor(props) {
    super(props);
    // Any number of links can be added here
    this.state = {
      links: [{
        text: 'Books',
        link: '/dashboard/admin/books',
        icon: 'fal fa-book-open'
      }, {
        text: 'Users',
        link: '/dashboard/admin/users',
        icon: 'fa-user'
      }, {
        text: 'Logs',
        link: '/dashboard/admin/logs',
        icon: 'fa-pencil-square-o'
      }, {
        text: 'Logout',
        link: '#',
        icon: 'fa-sign-out-alt'
      }]
    }
  };
  disconnect = () => {
    API.logout();
    window.location = "/";
  };
  render() {
    // let links = this.state.links.map((link, i) => <li key={i} ref={i + 1}><i aria-hidden="true" className={`fa ${ link.icon }`}></i><a href={link.link} target="_self" onClick={link.text === 'Logout' && this.disconnect}>{link.text}</a></li>);

     let links = this.state.links.map((link, i) => <li key={i} ref={i + 1}><i aria-hidden="true" className={`fa ${ link.icon }`}></i><a href={link.link} target="_self" onClick={(link.text === 'Logout')?this.disconnect:null}>{link.text}</a></li>);

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
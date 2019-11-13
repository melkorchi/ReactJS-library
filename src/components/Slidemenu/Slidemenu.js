import React from "react";

import Menulinks  from "../Menulinks/Menulinks";
import './Slidemenu.css';

class Slidemenu extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
      isOpen: false
    }
    // console.log(this.state);

    this._menuToggle = this._menuToggle.bind(this);
    this._handleDocumentClick = this._handleDocumentClick.bind(this);
    this.test = this.test.bind(this);
  }
  componentDidMount() {
    document.addEventListener('click', this._handleDocumentClick, false);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this._handleDocumentClick, false);
  }
  _handleDocumentClick(e) {
    if (!this.refs.root.contains(e.target) && this.state.isOpen === true) {
      this.setState({
      isOpen: false
    });
    };
  }
  _menuToggle(e) {
    e.stopPropagation();
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  test(e) {
    e.stopPropagation();
    console.log('test');
  }
  render() {
    let menuStatus = this.state.isOpen ? 'isopen' : '';
    // console.log(menuStatus);

    return (
      <div ref="root" className="Slidemenu">
        <div className="menubar">
          <div className="hambclicker" onClick={ this._menuToggle }></div>
          {/* <div className="hambclicker" onClick={ this.test }></div> */}
          <div id="hambmenu" className={ menuStatus }><span></span><span></span><span></span><span></span></div>
          <div className="title">
            <span>{ this.props.title }</span>
          </div>
        </div>
        <Menulinks menuStatus={ menuStatus }/>
      </div>
    )
  }
}

export default Slidemenu;
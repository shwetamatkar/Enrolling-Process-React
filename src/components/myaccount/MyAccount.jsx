import React, { Component } from "react";
import MyAccountComponent from "./MyAccountComponent";

class MyAccount extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(target) {
    this.props.history.push(target);
  }

  render() {
    return (
      <div>
        <MyAccountComponent handleClick={this.handleClick} />
      </div>
    );
  }
}

export default MyAccount;

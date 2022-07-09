import React, { Component } from "react";
class Button extends Component {
  render() {
    const { ltr, disabled, fn } = this.props;
    return (
      <button value={ltr} disabled={disabled} onClick={fn}>
        {ltr}
      </button>
    );
  }
}
export default Button;

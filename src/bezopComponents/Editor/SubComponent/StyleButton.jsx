import React from "react";
import "../css/editorStyle.css";

export default class StyleButton extends React.Component {
  constructor(props) {
    super(props);
    const { style, onToggle } = this.props;
    this.onToggle = (e) => {
      e.preventDefault();
      onToggle(style);
    };
  }

  render() {
    let className = "RichEditor-styleButton";
    const { active, LabelIcon, icon } = this.props;
    if (active) {
      className += " RichEditor-activeButton";
    }
    return (
      <span
        className={className}
        onMouseDown={this.onToggle}
        role="button"
        tabIndex="0"
      >
        { icon ? <LabelIcon style={{ fontSize: "15px" }} /> : LabelIcon }
      </span>
    );
  }
}

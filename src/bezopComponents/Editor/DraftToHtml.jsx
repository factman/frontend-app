import React from "react";
import draftToHtml from "draftjs-to-html";

export default class DraftToHtml extends React.Component {
  htmlDecode = (input) => {
    if (input) {
      const e = document.createElement("div");
      e.innerHTML = input.replace(/<a /g, '<a target="_blank" ')
        .replace(/<p>/g, '<p style="font-size: 1.3em; light-height: 1.8em; text-align: justify">')
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    }
    return null;
  }

  render() {
    const { content } = this.props;
    const markup = content ? draftToHtml(JSON.parse(content)) : null;
    return (
      <div dangerouslySetInnerHTML={{ __html: this.htmlDecode(markup) }} />
    );
  }
}

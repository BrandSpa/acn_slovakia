import React, { Component } from "react";
import DonateInline from "./donate/inline";

class DonateInlineSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      section: 0
    };
  }

  static defaultProps = {
    content: "",
    titles: []
  };

  render() {
    return (
      <div>
        <h2>
          {this.props.titles.length > 0
            ? this.props.titles[this.state.section]
            : ""}
        </h2>
        <div
          className="col-12 col-4-l"
          style={{ background: "RGBA(43, 58, 68, .9)" }}
        >
          <div dangerouslySetInnerHTML={{ __html: this.props.content }} />
        </div>
        <div className="col-12 col-8-l" style={{ background: "#fff" }}>
          <DonateInline {...this.props} />
        </div>
      </div>
    );
  }
}

export default DonateInlineSection;

import React, { Component } from "react";
import DonateInline from "./inline";
import { css } from "glamor";

class DonateInlineSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      section: 0
    };
  }

  static defaultProps = {
    content: ""
  };

  changeSection = (section) => {
    this.setState({section});
    console.log("hi section", section);
  };

  render() {
    const { texts } = this.props;
    let containerStyle = css({
      display: "flex",
      flexWrap: "wrap"
    });

    return (
      <div className={containerStyle}>
        <div className="col-12-l">
          <h3
            style={{
              color: "#fff",
              textAlign: "center",
              textShadow: "0 2px 20px rgba(0,0,0,0.47)"
            }}
          >
            {this.state.section == 0 ? texts.title : texts.success_title}
          </h3>
          <h5
             style={{
              color: "#fff",
              textAlign: "center",
              textShadow: "0 2px 20px rgba(0,0,0,0.47)",
              fontWeight: "300"
            }}
          >
             {this.state.section == 0 ? texts.subtitle : texts.success_subtitle}
          </h5>
        </div>
        
        <div
          className="col-12 col-4-l"
          style={this.state.section == 0 ? { display: "block", background: "RGBA(43, 58, 68, .9)", padding: "20px", margin: "40px 0"  } : { display: "none" } }
        >
          <div dangerouslySetInnerHTML={{ __html: this.props.content }} />
        </div>

        <div
          className={this.state.section == 0 ? "col-12 col-8-l" : "col-12 col-12-l"}
          style={{ background: "#fff", padding: "40px" }}
        >
          <DonateInline changeSection={this.changeSection} {...this.props} />
        </div>
      </div>
    );
  }
}

export default DonateInlineSection;

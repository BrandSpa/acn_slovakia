import React, { Component } from "react";
import Donate from "./index";
import { css } from "glamor";

class DonateSection extends Component {
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

  changeSection = (section) => {
    this.setState({section});
  };

  render() {
    let containerStyle = css({
      display: "flex",
      flexWrap: "wrap"
    });
    
    const { texts } = this.props;

    return (
      <div className={containerStyle}>
        <div className="col-12-l">
            <h2
            style={{
              color: "#fff",
              textAlign: "center",
              textShadow: "0 2px 20px rgba(0,0,0,0.47)"
            }}
          >
            {this.state.section == 0 ? texts.title : texts.success_title}
          </h2>
          <h3
             style={{
              color: "#fff",
              textAlign: "center",
              textShadow: "0 2px 20px rgba(0,0,0,0.47)",
              fontWeight: "300"
            }}
          >
             {this.state.section == 0 ? texts.subtitle : texts.success_subtitle}
          </h3>
        </div>
        <div
          className="col-12 col-4-l"
          style={this.state.section == 0 ? { display: "block", background: "RGBA(43, 58, 68, .9)", padding: "20px" } : { display: "none" } }
        >
          <div dangerouslySetInnerHTML={{ __html: this.props.content }} />
        </div>

        <div
          className={this.state.section == 0 ? "col-12 col-8-l" : "col-12 col-12-l"}
          style={{ background: "#fff", padding: "40px" }}
        >
          <Donate {...this.props} changeSection={this.changeSection} />
        </div>
      </div>
    );
  }
}

export default DonateSection;

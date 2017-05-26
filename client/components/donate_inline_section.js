import React, { Component } from 'react';
import DonateInline from './donate/inline';
import { css } from 'glamor';

class DonateInlineSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      section: 0
    };
  }

  static defaultProps = {
    content: '',
    titles: []
  };

  render() {
    let containerStyle = css({
      display: 'flex',
      flexWrap: 'wrap'
    });

    return (
      <div className={containerStyle}>
      <div className="col-12-l">
        <h2 style={{ color: '#fff', textAlign: 'center' }}>
          {this.props.titles.length > 0
            ? this.props.titles[this.state.section]
            : ""}
        </h2>
      </div>
        <div
          className="col-12 col-4-l"
          style={{ background: "RGBA(43, 58, 68, .9)", padding: "20px" }}
        >
          <div dangerouslySetInnerHTML={{ __html: this.props.content }} />
        </div>
        <div className="col-12 col-8-l" style={{ background: "#fff", padding: "40px" }}>
          <DonateInline {...this.props} />
        </div>
      </div>
    );
  }
}

export default DonateInlineSection;

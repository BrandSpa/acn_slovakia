import React from "react";

class Accordion extends React.Component {
  static defaultProps = {
    background: "#687f87",
    titleColor: ""
  };

  state = { show: false };

  componentDidMount() {
    return { content: "", btnTitle: "Toggle" };
  }

  toggle = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    const { content, btnTitle, background, titleColor } = this.props;

    const btnStyle = {
      width: "100%",
      height: "60px",
      border: "none",
      borderRadius: "0",
      fontSize: "18px",
      fontWeight: "normal",
      color: titleColor,
      background
    };

    return (
      <div className="accordion">
        <button
          className="accordion__btn"
          style={btnStyle}
          onClick={this.toggle}
        >
          {btnTitle}
          {" "}
          <i
            className={this.state.show ? "ion-chevron-up" : "ion-chevron-down"}
          />
        </button>
        <div
          className="accordion__content"
          style={this.state.show ? { display: "block" } : { display: "none" }}
        >
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    );
  }
}

export default Accordion;

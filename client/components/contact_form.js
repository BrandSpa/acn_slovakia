import React from "react";
import request from "axios";
import objToFormData from "../lib/obj_to_formdata";

const contactForm = React.createClass({
  getInitialState() {
    return {
      contact: {
        name: "",
        lastname: "",
        email: "",
        country: ""
      },
      errors: {
        name: {},
        lastname: {},
        email: {},
        country: {}
      }
    };
  },
  componentDidMount() {
    this.setState({
      contact: { ...this.state.contact, country: this.props.country }
    });
  },
  handleSubmit(e) {
    e.preventDefault();
    let data = objToFormData(this.state.contact);

    request
      .post("/wp-admin/admin-ajax.php", data)
      .then(res => console.log(res.data));
  },
  handleChange(field, e) {
    let contact = { ...this.state.contact, [field]: e.target.value };
    this.setState({ contact });
  },
  render() {
    let { contact, errors } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            placeholder="name"
            onChange={this.handleChange.bind(null, "name")}
            value={contact.name}
          />
          <div className="input-error">{errors.name.message}</div>
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="lastname"
            onChange={this.handleChange.bind(null, "lastname")}
            value={contact.lastname}
          />
          <div className="input-error">{errors.lastname.message}</div>
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="email"
            onChange={this.handleChange.bind(null, "email")}
            value={contact.email}
          />
          <div className="input-error">{errors.email.message}</div>
        </div>
        <div className="input-container">
          <select
            onChange={this.handleChange.bind(null, "country")}
            value={contact.country}
          >
            <option value="">Country</option>
            <option value="Germany">Germany</option>
          </select>
          <div className="input-error">{errors.country.message}</div>
        </div>
        <button>action</button>
      </form>
    );
  }
});

export default contactForm;

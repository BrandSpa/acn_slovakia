import React from "react";
import request from "axios";
import validtor from "validator";
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
        name: true,
        lastname: true,
        email: true
      },
      countries: []
    };
  },

  componentDidMount() {
    let data = objToFormData({ action: "countries" });

    request.post("/wp-admin/admin-ajax.php", data).then(res => {
      this.setState({ countries: res.data });
    });

    this.setState({
      contact: { ...this.state.contact, country: this.props.country }
    });
  },

  	checkEmpty(field) {
		return validator.isEmpty(this.state[field]);
	},
	
	validate() {
		let errors = {};
		let validations = ['firstName', 'lastName', 'email', 'phone'].map((field) => {
			let val = this.checkEmpty(field);
			errors = {...errors, [field]: val };
			return val;
		});

		this.setState({ errors });
		
		return Promise.all(validations);
	},

	isValid() {
		return this.validate().then(arr => arr.every(item => item == false) );
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
    let { placeholders, validationMessages } = this.props;

    return (
      <form className="form-inline" onSubmit={this.handleSubmit}>
        <div className="input-container">
          <input
            style={{'marginLeft': '-1px', 'borderRadius': '5px 0 0 5px'}}
            type="text"
            placeholder={placeholders.name}
            onChange={this.handleChange.bind(null, "name")}
            value={contact.name}
          />
          <div className={errors.name ? "input-error" : "hidden"}> {errors.name } {validationMessages.name}</div>
        </div>
        
        <div className="input-container">
          <input
            style={{'marginLeft': '-1px'}}
            type="text"
            placeholder={placeholders.lastname}
            onChange={this.handleChange.bind(null, "lastname")}
            value={contact.lastname}
          />
          <div className={errors.lastname ? "input-error" : "hidden"}>{validationMessages.lastname}</div>
        </div>
        <div className="input-container">
          <input
            style={{'marginLeft': '-1px'}}
            type="text"
            placeholder={placeholders.email}
            onChange={this.handleChange.bind(null, "email")}
            value={contact.email}
          />
          <div className="input-error">{validationMessages.email}</div>
        </div>
        <div className="input-container">
          <select
            style={{'marginLeft': '-1px'}}
            onChange={this.handleChange.bind(null, "country")}
            value={contact.country}
          >
            {this.state.countries.map((country, i) => (
              <option key={i} value={country}>{country}</option>
            ))}
          </select>
        </div>
        <button style={{'marginLeft': '-2px'}} onClick={this.handleSubmit}>PRAY</button>
      </form>
    );
  }
});

export default contactForm;

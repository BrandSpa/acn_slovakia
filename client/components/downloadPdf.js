import React from "react";
import request from "axios";
import qs from "qs";
import isEmail from "validator/lib/isEmail";
import getCountries from "../lib/getCountries";
const endpoint = "/wp-admin/admin-ajax.php";

class DownloadPdf extends React.Component {
  static defaultProps = {
    btn: {
      text: "",
      background: ""
    },
    texts: {},
    countries: getCountries,
    pdf_url: ""
  };

  constructor(props) {
    super(props);
    const { country } = props;

    this.state = {
      email: "",
      errors: {
        email: false
      },
      country
    };
  }

  validate = () => {
    let errors = {};

    let validations = Object.keys(this.state.errors).map(field => {
      let val = !isEmail(this.state[field]);
      errors = { ...errors, [field]: val };
      return val;
    });

    this.setState({ errors });

    return Promise.all(validations);
  };

  isValid = () => {
    return this.validate()
      .then(arr => arr.every(item => item == false))
      .catch(err => console.error(err));
  };

  handlepdf = e => {
    e.preventDefault();
    this.isValid().then(this.storeContact);
  };

  storeContact = isValid => {
    const { email, country } = this.state;
    let mc_data = {
      email_address: email,
      status: "subscribed",
      merge_fields: { NAME: "", COUNTRY: country },
      update_existing: true
    };

    let data = qs.stringify({ action: "mailchimp_subscribe", data: mc_data });

    if (isValid) {
      request.post(endpoint, data).then(res => {
        if (res.data.id) window.location = this.props.pdf_url;
      });
    }
  };

  handleChange = (field, e) => {
    this.setState({ ...this.state, [field]: e.target.value });
  };

  render() {
    const { countries, btn, texts } = this.props;
    const { errors } = this.state;

    let btnStyle = {
      borderColor: btn.background,
      background: btn.background
    };

    return (
      <form onSubmit={this.handlepdf} className="form-inline download-pdf">
        <div className="input-container">
          <input
            type="text"
            placeholder={texts.email}
            onChange={this.handleChange.bind(null, "email")}
            value={this.state.email}
          />

          <div className={errors.email ? "input-error" : "hidden"}>
            {errors.email} {texts.validation_email}
          </div>
        </div>

        <div className="input-container">
          <select
            onChange={this.handleChange.bind(null, "country")}
            value={this.state.country || this.props.country}
          >
            {countries.map((country, i) => (
              <option key={i} value={country}>{country}</option>
            ))}
          </select>
        </div>
        <button onClick={this.handlepdf} style={btnStyle}>{btn.text}</button>
      </form>
    );
  }
}

export default DownloadPdf;

import React from 'react';
import request from 'axios';
import isEmpty from 'validator/lib/isEmpty';
import objToFormData from '../lib/obj_to_formdata';
import qs from 'qs';
import getCountries from '../lib/getCountries';

const contactForm = React.createClass({
  getInitialState() {
    return {
      contact: {name: '', lastname: '', email: '', country: ''},
      errors: {name: false, lastname: false, email: false},
      countries: getCountries,
      loading: false
    };
  },

  getDefaultProps() {
    return {validationMessages: {}, placeholders: {}, texts: {}, redirect: ''};
  },

  componentDidMount() {
    this.setState({
      contact: {...this.state.contact, country: this.props.country}
    });
  },

  checkEmpty(field) {
    return isEmpty(this.state.contact[field]);
  },

  validate() {
    let errors = {};
    let validations = Object.keys(this.state.errors).map(field => {
      let val = this.checkEmpty(field);
      errors = {...errors, [field]: val};
      return val;
    });

    this.setState({errors});

    return Promise.all(validations);
  },

  isValid() {
    return this
      .validate()
      .then(arr => arr.every(item => item == false))
      .catch(err => console.error(err));
  },

  handleSubmit(e) {
    e.preventDefault();
    let data = objToFormData(this.state.contact);
    this.isValid().then(this.storeContact).catch(err => console.error(err));
  },

  storeContact(isValid) {
    let {email, name, lastname, country} = this.state.contact;

    let mc_data = {
      email_address: email,
      status: 'subscribed',
      merge_fields: {NAME: `${name} ${lastname}`, COUNTRY: country},
      update_existing: true
    };

    let data = qs.stringify({action: 'mailchimp_subscribe', data: mc_data});

    if (isValid) {
      request
        .post('/wp-admin/admin-ajax.php', data)
        .then(res => {
          if (res.data.id) window.location = this.props.redirect;
          if(res.data.title == 'Member Exists') {
            console.error('member Exists');
            this.setState({loading: false});
          };
        })
        .catch(err => console.error(err));
    }
  },

  handleChange(field, e) {
    let contact = {...this.state.contact, [field]: e.target.value};
    this.setState({contact});
  },

  render() {
    let {contact, errors} = this.state;
    let {placeholders, validationMessages, texts} = this.props;

    return (
      <form
        style={{textAlign: 'center'}}
        className="form-inline contact-form"
        onSubmit={this.handleSubmit}
      >
        <div className="input-container">
          <input
            type="text"
            placeholder={placeholders.name}
            onChange={this.handleChange.bind(null, 'name')}
            value={contact.name}
          />
          <div className={errors.name ? 'input-error' : 'hidden'}>
            {errors.name} {validationMessages.name}
          </div>
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder={placeholders.lastname}
            onChange={this.handleChange.bind(null, 'lastname')}
            value={contact.lastname}
          />
          <div className={errors.lastname ? 'input-error' : 'hidden'}>
            {validationMessages.lastname}
          </div>
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder={placeholders.email}
            onChange={this.handleChange.bind(null, 'email')}
            value={contact.email}
          />
          <div className={errors.email ? 'input-error' : 'hidden'}>
            {validationMessages.email}
          </div>
        </div>
        <div className="input-container">
          <select
            onChange={this.handleChange.bind(null, 'country')}
            value={contact.country}
          >
            <option value="">{texts.select_country}</option>
            {this.state.countries.map((country, i) => (
              <option key={i} value={country}>{country}</option>
            ))}
          </select>
        </div>
        <button style={{marginLeft: '-2px'}} onClick={this.handleSubmit} disabled={this.state.loading}>
          {texts.button}{this.state.loading ? '...' : ''}
        </button>
      </form>
    );
  }
});

export default contactForm;

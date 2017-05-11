import React from 'react';
import request from 'axios';
import isEmpty from 'validator/lib/isEmpty';
import qs from 'qs';
import objToFormData from '../lib/obj_to_formdata';
import getCountries from '../lib/getCountries';
const endpoint = '/wp-admin/admin-ajax.php';

const contactForm = React.createClass({

  getInitialState() {
    return {
      contact: {
        name: '',
        lastname: '', 
        email: '', 
        country: ''
      },
      errors: {name: false, lastname: false, email: false},
      countries: getCountries,
      officeCountries: [],
      inOffice: false,
      loading: false,
      showMemberExists: false
    };
  },

  getDefaultProps() {
    return {
      validationMessages: {}, 
      placeholders: {}, 
      texts: {}, 
      redirect: '',
      btnBg: '',
      cl: {
        event: 'Subscription',
        tags: ''
      }
    };
  },

  componentDidMount() {
    const data = qs.stringify({action: 'office_countries'});

    const req = request.post(endpoint, data).then(cons => {
      this.setState({
        contact: {
          ...this.state.contact, country: this.props.country
        },
        officeCountries: cons.data,
        inOffice: cons.data.indexOf(this.props.country) !== -1
      });
    });

    return req;
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
  
  storeConvertLoop() {
    const tags = typeof this.props.cl.tags == "string" ? this.props.cl.tags.trim().split(',') : [];
    const data = qs.stringify({data: {...this.state.contact, tags}, action: 'convertloop_contact'});
    return request.post(endpoint, data);
  },
 
  storeEventConvertLoop() {
    const { email, country } = this.state.contact;
    
    const event = {name: this.props.cl.event, country , person: { email } };
    const data = qs.stringify({data: event, action: 'convertloop_event'});
    return request.post(endpoint, data);
  },

  storeInfusion() {
    const data = qs.stringify({data: this.state.contact, action: 'infusion_contact'});
    return request.post(endpoint, data);
  },
  
  storeContact(isValid) {
    if (isValid) {
      this.setState({loading: true});
      if(this.state.inOffice) {
       this.storeConvertLoop()
       .then(this.storeEventConvertLoop)
       .then(res => {
         console.log(res.data);
          if (res.data.person.email) window.location = this.props.redirect;
        });
      } else {
        this.storeConvertLoop()
        .then(this.storeEventConvertLoop)
        .then(this.storeInfusion)
        .then(res => {
          if (res.data.success) window.location = this.props.redirect;
        })
      }
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

        <button style={{marginLeft: '-2px', background: this.props.btnBg, color: '#fff'}} onClick={this.handleSubmit} disabled={this.state.loading}>
          {texts.button}{this.state.loading ? '...' : ''}
        </button>

        <span style={this.state.showMemberExists ? {color: '#fff',display: 'inline-block', width: '90%', padding: '10px', margin: '5px auto', background: '#f4334a', color: '#fff'} :{display: 'none'}}>{'you are already praying'}</span>
      </form>
    );
  }
});

export default contactForm;

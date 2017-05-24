import React, { Component } from "react";
import request from "axios";
import qs from "qs";
import Amount from "./amount";
import CreditCard from "./creditCard";
import Contact from "./contact";
import * as actions from '../../actions/donate';
const endpoint = "/wp-admin/admin-ajax.php";

function isAllValid(errors = {}) {
  return Object.keys(errors).every(key => errors[key] == true);
}

class DonateInline extends Component {
  static defaultProps = { texts: {}, redirect: {} };

  state = {
    section: 0,
    left: 0,
    loading: false,
    donation_type: "monthly",
    amount: 30,
    currency: "usd",
    countries: [],
    contact: { name: "", email: "", country: "" },
    stripe: {
      card_type: "",
      number: "",
      exp_month: "",
      exp_year: "",
      cvc: "",
      token: ""
    },
    errors: { stripe: {}, contact: {} }
  };

  componentWillMount() {
    actions.fetchCountries().then(countries => this.setState({ countries }));
  }
 
  componentDidMount() {
    this.donateForm.addEventListener("keydown", e => {
      if (e.which == 9) {
        e.preventDefault();
        this.nextSection();
      }
    });
  }

  handleChange = field => {
    this.setState({ ...this.state, ...field });
  };

  creditCardIsValid = () => {
    let errs = this.creditCard.validateAll();
    return isAllValid(errs.stripe);
  };

  contactIsValid = () => {
    let errs = this.contact.validateAll();
    return isAllValid(errs.contact);
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.creditCardIsValid() && this.contactIsValid()) {
      actions.stripeToken(this.state).then(res => {
        if (res.data.id) {
          const stripe = { ...this.state.stripe, token: res.data.id };
          this.setState({ loading: false, stripe });

          actions
          .stripeCharge({...this.state, stripe})
          .then(res => this.completeTransaction(res.data));
        }

        if (res.data.stripeCode) {		
          this.setState({ loading: false, declined: true });		
        }
      });
    }
  };

  completeTransaction = (stripeResponse = {}) => {
    const { amount, donation_type } = this.state;
    const base = this.props.redirect[donation_type];
    const { customer, id } = stripeResponse;

    actions.storeConvertLoop(this.state)
      .then(actions.storeEventConvertLoop.bind(null, this.state))
      .then(actions.storeInfusion.bind(null, this.state))
      .then(res => {
        const url = `${base}?customer_id=${customer}-${id}&order_revenue=${amount}&order_id=${id}`;
        window.location = url;
      });
  };

  render() {
    let sectionWidth = `100%`;
    let viewPortStyle = { width: "100%", left: this.state.left };
    let donationTypeStyle = {
      display: "inline",
      marginLeft: "15px",
      color: "#fff"
    };

    let backBtnStyle = {
      float: "right",
      background: "transparent",
      border: "none"
    };

    return (
      <form
        onSubmit={this.handleSubmit}
        className="donate_react"
        ref={donate => (this.donateForm = donate)}
      >
        <div className="donate_react__viewport" style={viewPortStyle}>
          <Amount
            {...this.state}
            {...this.props}
            width={sectionWidth}
            onChange={this.handleChange}
          />

          <CreditCard
            ref={creditCard => (this.creditCard = creditCard)}
            {...this.state}
            {...this.props}
            width={sectionWidth}
            onChange={this.handleChange}
          />

          <Contact
            ref={contact => (this.contact = contact)}
            {...this.state}
            {...this.props}
            width={sectionWidth}
            onChange={this.handleChange}
          />
        </div>
        
        <div className="form-group">
          <button
            className="donate_react__submit pull-left"
            onClick={this.handleSubmit}
            disabled={this.state.loading}
          >
            {this.props.texts.donate}
          </button>

          <span style={donationTypeStyle}>
            {`${this.state.amount} USD ${this.props.texts[this.state.donation_type]}`}
          </span>
         
        </div>
      </form>
    );
  }
}

export default DonateInline;

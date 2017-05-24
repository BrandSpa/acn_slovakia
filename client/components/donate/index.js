import React, { Component } from "react";
import request from "axios";
import qs from "qs";
import Amount from "./amount";
import CreditCard from "./creditCard";
import Contact from "./contact";
import * as actions from "../../actions/donate";
const endpoint = "/wp-admin/admin-ajax.php";

function isAllValid(errors = {}) {
  return Object.keys(errors).every(key => errors[key] == true);
}

class Donate extends Component {
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

  handleSubmit = e => {
    e.preventDefault();
    this.nextSection();
  };

  completeTransaction = (stripeResponse = {}) => {
    const { amount, donation_type } = this.state;
    const base = this.props.redirect[donation_type];
    const { customer, id } = stripeResponse;

    actions
      .storeConvertLoop(this.state)
      .then(actions.storeEventConvertLoop.bind(null, this.state))
      .then(actions.storeInfusion.bind(null, this.state))
      .then(res => {
        const url = `${base}?customer_id=${customer}-${id}&order_revenue=${amount}&order_id=${id}`;
        window.location = url;
      });
  };

  creditCardIsValid = () => {
    let errs = this.creditCard.validateAll();
    return isAllValid(errs.stripe);
  };

  contactIsValid = () => {
    let errs = this.contact.validateAll();
    return isAllValid(errs.contact);
  };

  nextSection = () => {
    let section = this.state.section < 2 ? this.state.section + 1 : 2;

    if (this.state.section == 1) {
      if (!this.creditCardIsValid()) return false;

      actions.stripeToken(this.state).then(res => {
        if (res.id) {
          const stripe = { ...this.state.stripe, token: res.id };
          this.setState({ ...this.state, stripe });
          return stripe;
        }

        if (res.stripeCode) {
          this.setState({ ...this.state, loading: false, declined: true });
        }
      });
    }

    if (this.state.section == 2) {
      if (!this.contactIsValid()) return false;
      actions
        .stripeCharge(this.state)
        .then(res => this.completeTransaction(res.data));
    }

    let left = `-${section * 100}%`;

    if (this.state.section == 0) {
      this.setState({ section, left, loading: false });
    } else {
      this.setState({ section, left });
    }
  };

  prevSection = e => {
    e.preventDefault();
    let section = this.state.section >= 0 ? this.state.section - 1 : 0;
    let left = `-${section * 100}%`;
    this.setState({ section, left });
  };

  render() {
    let sectionWidth = `${100 / 3}%`;
    let viewPortStyle = { width: "300%", left: this.state.left };
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
            {this.state.section == 1
              ? this.props.texts.next
              : this.props.texts.donate}
          </button>
          <span style={donationTypeStyle}>
            {`${this.state.amount} USD ${this.props.texts[this.state.donation_type]}`}
          </span>
          {this.state.section > 0
            ? <button style={backBtnStyle} onClick={this.prevSection}>
                {this.props.texts.back}
              </button>
            : ""}
        </div>
      </form>
    );
  }
}

export default Donate;

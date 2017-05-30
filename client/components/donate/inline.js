import React, { Component } from "react";
import request from "axios";
import qs from "qs";
import Amount from "./amount";
import CreditCard from "./creditCard";
import Contact from "./contact";
import FourStep from './four';
import * as actions from "../../actions/donate";
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
    errors: { stripe: {}, contact: {} },
    is_blue: false,
    show_four: false
  };

  componentWillMount() {
    actions.fetchCountries().then(countries => this.setState({ countries }));
  }

  componentDidMount() {
  if(this.donateForm) {
      this.donateForm.addEventListener("keydown", e => {
        if (e.which == 9) {
          e.preventDefault();
          this.handleSubmit();
        }
      });
    } 
  }

  handleChange = field => {
    this.setState({ ...this.state, ...field });
  };

  creditCardIsValid = () => {
    return new Promise((resolve, reject) => {
      let errs = this.creditCard.validateAll();
      let isValid = isAllValid(errs.stripe);
      return resolve(isValid);
    });
  };

  contactIsValid = () => {
    return new Promise((resolve, reject) => {
      let errs = this.contact.validateAll();
      let isValid = isAllValid(errs.contact);
      return resolve(isValid);
    });
  };

  handleSubmit = e => {
    if (e) e.preventDefault();

    this.contactIsValid()
      .then(res => {
        if (!res) return false;
      })
      .then(this.creditCardIsValid)
      .then(res => {
        if (!res) return false;
        this.setState({loading: true});
        actions.stripeToken(this.state).then(res => {
          if (res.id) {
            const stripe = { ...this.state.stripe, token: res.id };
            this.setState({ stripe });

            actions
              .stripeCharge({ ...this.state, stripe })
              .then(res => this.completeTransaction(res.data));
          }

          if (res.stripeCode) {
            this.setState({ loading: false, declined: true });
          }
        });
      });
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
        if (donation_type == "monthly") {
          const url = `${base}?customer_id=${customer}-${id}&order_revenue=${amount}&order_id=${id}`;
          window.location = url;
        } else {
          this.setState({show_four: true});
          this.props.changeSection(1);
        }
      });
  };

  render() {
    let sectionWidth = "100%";
    let viewPortStyle = {
      width: "100%",
      left: this.state.left,
      display: "block"
    };

    let donationTypeStyle = {
      display: "inline",
      marginLeft: "15px",
      color: this.props.is_blue ? "#3C515F" : "#fff"
    };

    let backBtnStyle = {
      float: "right",
      background: "transparent",
      border: "none"
    };
    
    console.log('four', this.state.show_four);

    return (
      <div>
        <form
          onSubmit={this.handleSubmit}
          className={
            this.props.is_blue ? "donate_react donate_inline" : "donate_react"
          }
          style={this.state.show_four ? { display: "none" } : { display: "block" }}
          ref={donate => (this.donateForm = donate)}
        >

          <div className="donate_react__viewport" style={viewPortStyle}>
            <Contact
              ref={contact => (this.contact = contact)}
              {...this.state}
              {...this.props}
              width={sectionWidth}
              inline={true}
              onChange={this.handleChange}
            />

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
          </div>

          <div style={{ marginBottom: "10px" }}>
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

        <FourStep {...this.props} {...this.state}  />
      </div>
    );
  }
}

export default DonateInline;

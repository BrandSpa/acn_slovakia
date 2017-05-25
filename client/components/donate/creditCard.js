import React from "react";
import validCard from "card-validator";
import Cards from "./cards";
import { onlyNum, maxLength } from "../../lib/clean_inputs";

class CedritCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopover: false
    };
  }

  static defaultProps = { texts: {}, stripe: {}, errors: {} };

  validateCard = card => {
    let number = validCard.number(card).isValid;
    return this.updateErrors({ number });
  };

  validateExpiry = (month, year) => {
    let valid = validCard.expirationDate({ month, year });
    let exp_month = valid.isValid;
    let exp_year = valid.isValid;
    return this.updateErrors({ exp_month, exp_year });
  };

  validateCvc = cvc => {
    cvc = cvc.length >= 3;
    return this.updateErrors({ cvc });
  };

  getCardType = cardNum => {
    return validCard.number(cardNum).card
      ? validCard.number(cardNum).card.type
      : null;
  };

  updateErrors = field => {
    return { ...this.props.errors, stripe: field };
  };

  handleCard = e => {
    let val = e.currentTarget.value;
    let number = onlyNum(val);
    number = maxLength(number, 16);
    let errors = this.validateCard(number);
    let card_type = this.getCardType(number);
    let stripe = { ...this.props.stripe, number, card_type };
    this.props.onChange({ stripe, errors });
  };

  handleExpiry = (type, e) => {
    let { stripe } = this.props;
    let val = onlyNum(e.currentTarget.value);
    val = maxLength(val, 2);
    let exp_month = stripe.exp_month;
    let exp_year = stripe.exp_year;
    if (type == "exp_month") exp_month = val;
    if (type == "exp_year") exp_year = val;
    let errors = this.validateExpiry(exp_month, exp_year);
    stripe = { ...stripe, exp_month, exp_year };

    this.props.onChange({ stripe, errors });
  };

  handleCvc = e => {
    let { stripe } = this.props;
    let cvc = onlyNum(e.currentTarget.value);
    cvc = maxLength(cvc, 4);
    stripe = { ...stripe, cvc };
    let errors = this.validateCvc(cvc);
    this.props.onChange({ stripe, errors });
  };

  showErr = field => {
    if (this.props.errors.stripe) {
      return this.props.errors.stripe[field] == false
        ? "form-group__error"
        : "hidden";
    }

    return "";
  };

  inputErrStyle = field => {
    if (this.props.errors.stripe) {
      return this.props.errors.stripe[field] == false
        ? "form-group--error"
        : "";
    }

    return "";
  };

  validateAll = e => {
    if (e) e.preventDefault();
    const { stripe } = this.props;
    const number = this.validateCard(stripe.number);
    const exp_month = this.validateExpiry(stripe.exp_month, stripe.exp_year);
    const cvc = this.validateCvc(stripe.cvc);

    const errors = {
      ...this.props.errors,
      stripe: { ...number.stripe, ...exp_month.stripe, ...cvc.stripe }
    };

    this.props.onChange({ errors });

    return errors;
  };

  togglePopover = e => {
    e.preventDefault();
    this.setState({showPopover: !this.showPopover});
  }

  render() {
    const { texts, stripe, errors } = this.props;

    return (
      <div
        className="donate_react__creditcard"
        style={{ width: this.props.width, float: "left", padding: "1px" }}
      >
        <Cards {...this.props} />
        <div className="form-group">
          <input
            type="text"
            placeholder={texts.placeholder_credit_card}
            className={`form-control ${this.inputErrStyle("number")}`}
            onChange={this.handleCard}
            value={stripe.number}
          />
          <span className={this.showErr("number")}>
            {texts.validation_card}
          </span>
        </div>
        <div className="row donate_react__creditcard__row">
          <div className="form-group col-4-l col-4">
            <input
              type="text"
              placeholder={texts.placeholder_month}
              className="form-control"
              onChange={this.handleExpiry.bind(null, "exp_month")}
              value={stripe.exp_month}
            />
            <span className={this.showErr("exp_month")}>
              {texts.validation_month}
            </span>
          </div>
          <div className="form-group col-4-l col-4">
            <input
              type="text"
              placeholder={texts.placeholder_year}
              className="form-control"
              onChange={this.handleExpiry.bind(null, "exp_year")}
              value={stripe.exp_year}
            />
            <span className={this.showErr("exp_year")}>
              {texts.validation_year}
            </span>
          </div>

          <div className="form-group col-4-l col-4">
            <input
              type="text"
              placeholder={texts.placeholder_cvc}
              className="form-control"
              onChange={this.handleCvc}
              value={stripe.cvc}
            />
            <a
              href="#"
              style={{
                display: "block",
                background: "#3C515F",
                width: "20px",
                height: "20px",
                borderRadius: "20px",
                color: "#fff",
                textAlign: "center",
                position: "absolute",
                top: "12px",
                right: "25px"
              }}
              onClick={this.props.togglePopover}
            >
              <i className="ion-help" />
            </a>
            <span className={this.showErr("cvc")}>
              {texts.validation_cvc}
            </span>
          </div>

        </div>

        <div
          style={
            this.state.showPopover
              ? {
                  background: "#fff",
                  boxShadow: "0 1px 3px 0 rgba(0,0,0,0.26)",
                  borderRadius: "2px",
                  textAlign: "center",
                  display: "block",
                  margin: "15px 0",
                  position: "relative",
                  zIndex: "100"
                }
              : { display: "none" }
          }
        >

          <span
            style={{
              display: "block",
              position: "absolute",
              top: "2px",
              right: "2px",
              width: "15px",
              height: "15px",
              color: "red",
              cursor: "pointer"
            }}
            onClick={this.props.togglePopover}
          >
            <i className="ion-close" />
          </span>

          <span
            style={{
              display: "block",
              color: "#3C515F",
              padding: "10px",
              fontSize: "14px"
            }}
          >
            {texts.explain_cvc}
          </span>
          <img
            width="60px"
            src={`${texts.template_uri}/public/img/cvc.png`}
            alt=""
          />
        </div>
      </div>
    );
  }
}

export default CedritCard;

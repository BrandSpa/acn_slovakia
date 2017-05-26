import React, { Component } from "react";
import * as actions from "../../actions/donate";

class Four extends Component {
	constructor(props) {
		super(props);
	}

	handleYes = () => {
		actions.stripeToken(this.props).then(res => {
			if (res.id) {
				const stripe = { ...this.props.stripe, token: res.data.id };
				this.setState({ loading: false, stripe });

				actions
					.stripeCharge({ ...this.props, stripe })
					.then(res => this.completeTransaction(res.data));
			}
		});
	};

	handleNo = (e) => {
		e.preventDefault();
		console.log('no');
	};
	
	completeTransaction = (stripeResponse = {}) => {
    const { amount, donation_type } = this.props;
    const base = this.props.redirect["monthly"];
    const { customer, id } = stripeResponse;

    actions
      .storeConvertLoop(this.props)
      .then(actions.storeEventConvertLoop.bind(null, this.props))
      .then(actions.storeInfusion.bind(null, this.props))
      .then(res => {
        const url = `${base}?customer_id=${customer}-${id}&order_revenue=${amount}&order_id=${id}`;
        window.location = url;
      });
  };

	render() {
		const { texts, amount } = this.props;
		let d = parseInt(amount) / 30;
		d = d.toFixed(2);
		console.log(this.props);

		return (
			<div>
				<h3>{'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque sequi ut, natus nesciunt quod, assumenda perspiciatis doloremque voluptatum, labore ipsam minima eius in modi culpa tenetur. Animi, incidunt nulla vel?'}</h3>
				<p>{`donar diario: $${d}`}</p>
				<button onClick={this.handleYes} style={{ background: "RGBA(93, 232, 123, 1.00)" }}>SI</button>
				<button onClick={this.handleNo} style={{ background: "red" }}>NO</button>
			</div>
		)
	}
}

export default Four;
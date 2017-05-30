import React, { Component } from "react";
import * as actions from "../../actions/donate";

class Four extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false
		}
	}

	handleYes = () => {
		
		actions.stripeToken(this.props).then(res => {
			if (res.id) {
				const stripe = { ...this.props.stripe, token: res.id};
				this.setState({ loading: true, stripe });

				actions
					.stripeCharge({ ...this.props, stripe, donation_type: "monthly"  })
					.then(res => this.completeTransaction(res.data));
			}
		});
	};

	handleNo = (e) => {
		e.preventDefault();
		this.props.changeSection(1);
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

		return (
			<div style={this.props.show_four ? { display: "block" } : { display: "none" }}>
				<h5>{texts.text_four_step}</h5>
				<p>{`${texts.subtext_four_step} $${d}`}</p>
				<div className="col-6 col-6-l">
					<button
						onClick={this.handleYes}
						style={{ background: "#50B45A", width: "100%" }}
					>
						{texts.yes}{this.state.loading ? "..." : ""}
					</button>
				</div>

				<div className="col-6 col-6-l">
					<button onClick={this.handleNo} style={{ background: "transparent", border: "1px solid #F1364E", width:"100%", color: "#F1364E" }}>{texts.no}</button>
				</div>
				
			</div>
		)
	}
}

export default Four;
/* @flow */
import request from "axios";
import qs from "qs";
const endpoint = "/wp-admin/admin-ajax.php";

export function fetchCountries() : Function {
  const data = qs.stringify({ action: "countries" });

  return request
    .post(endpoint, data)
    .then(res => (Array.isArray(res.data) ? res.data : []));
}

export function stripeToken(state: Object) : Function {
  let data = qs.stringify({
    action: "stripe_token",
    data: state.stripe
  });

  return request.post(endpoint, data).then(res => res.data);
}

export function stripeCharge(state: Object) {
  const { contact, currency, amount, donation_type, stripe: { token } } = state;

  const data = {
    ...contact,
    currency,
    amount,
    donation_type,
    stripe_token: token
  };

  const dataAjax = qs.stringify({ action: "stripe_charge", data });

  return request.post(endpoint, dataAjax);
}

export function storeConvertLoop(state: Object) {
  const data = qs.stringify({
    data: state.contact,
    action: "convertloop_contact"
  });

  return request.post(endpoint, data);
}

export function storeEventConvertLoop(state: Object) {
  const { email, country } = state.contact;

  const metadata = {
    amount: state.amount,
    type: state.donation_type
  };

  const event = {
    name: `Donation-${state.donation_type}`,
    person: { email },
    country,
    metadata
  };

  const data = qs.stringify({ data: event, action: "convertloop_event" });
  return request.post(endpoint, data);
}

export function storeInfusion(state: Object) {
  let tags = "";
  if (state.donation_type == "monthly") tags = ["870", "924"];
  if (state.donation_type == "once") tags = ["868", "926"];
  const data = qs.stringify({
    data: { ...state.contact, tags },
    action: "infusion_contact"
  });

  return request.post(endpoint, data);
}

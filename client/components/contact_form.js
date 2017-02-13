import React from "react";
import request from "axios";
import objToFormData from "../lib/obj_to_formdata";

const contactForm = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    let data = objToFormData({ action: "countries" });
    request
      .post("/wp-admin/admin-ajax.php", data)
      .then(res => console.log(res.data));
  },
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="name" />
        <input type="text" placeholder="lastname" />
        <input type="text" placeholder="email" />
        <select name="" id="">
          <option value="">Country</option>
        </select>
        <button>action</button>
      </form>
    );
  }
});

export default contactForm;

"use strict";
import React from "react";
import { render } from "react-dom";
import ContactForm from "./components/contact_form";

if (document.querySelectorAll(".contact-form").length > 1) {
  let forms = [...document.querySelectorAll(".contact-form")];
  forms.forEach(el => {
    let props = el.getAttribute("data-props")
      ? JSON.parse(el.getAttribute("data-props"))
      : {};

    render(<ContactForm {...props} />, el);
  });
}

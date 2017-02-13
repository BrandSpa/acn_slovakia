"use strict";
import React from "react";
import { render } from "react-dom";
import ContactForm from "./components/contact_form";

if (document.getElementById("contact-form")) {
  render(<ContactForm />, document.getElementById("contact-form"));
}

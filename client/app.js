"use strict";
import React from "react";
import { render } from "react-dom";
import multipleRender from "./lib/mutiple_render";
import ContactForm from "./components/contact_form";

multipleRender(".contact-form", ContactForm);

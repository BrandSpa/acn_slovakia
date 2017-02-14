"use strict";
import React from "react";
import { render } from "react-dom";
import multipleRender from "./lib/mutiple_render";
import ContactForm from "./components/contact_form";
import HeaderSlider from "./components/header_slider";

multipleRender(".contact-form", ContactForm);
multipleRender(".header-slider", HeaderSlider);
multipleRender(".header-slider", HeaderSlider);
multipleRender(".header-slider", HeaderSlider);


import React from "react";
import { render } from "enzyme";
import multipleRender from "../../lib/mutiple_render";
import ContactForm from "../../components/contact_form";

describe("lib multipleRender", () => {
  it("should render one component", () => {
    document.body.innerHTML = `<div class="container"></div>`;
    let ren = multipleRender(".container", ContactForm);
    expect(document.querySelectorAll("form").length).toEqual(1);
  });

  it("should render twice component", () => {
    document.body.innerHTML = `<div class="container"></div> <div class="container"></div>`;
    let ren = multipleRender(".container", ContactForm);
    expect(document.querySelectorAll("form").length).toEqual(2);
  });
});

import React from "react";
import { render } from "enzyme";
import moxios from 'moxios';
import multipleRender from "../../lib/mutiple_render";
import ContactForm from "../../components/contact_form";

describe("lib multipleRender", () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it("should render one component", () => {
      moxios.stubRequest('/wp-admin/admin-ajax.php', {
        status: 200,
        responseText: 'hello'
    });

    document.body.innerHTML = `<div class="container"></div>`;
    let ren = multipleRender(".container", ContactForm);
    expect(document.querySelectorAll("form").length).toEqual(1);
  });

  it("should render twice component", () => {
      moxios.stubRequest('/wp-admin/admin-ajax.php', {
        status: 200,
        responseText: 'hello'
    });

    document.body.innerHTML = `<div class="container" data-props='{"country": "Germany","placeholders": {},"validationMessages": {}}'></div> <div class="container" data-props='{"country": "Germany","placeholders": {},"validationMessages": {}}'></div>`;
    let ren = multipleRender(".container", ContactForm);
    expect(document.querySelectorAll("form").length).toEqual(2);
  });
});

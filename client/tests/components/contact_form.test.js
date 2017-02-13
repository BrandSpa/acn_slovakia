import React from "react";
import { shallow, mount } from "enzyme";
import moxios from 'moxios';
import ContactForm from "../../components/contact_form";

describe("component ContactForm", () => {
  beforeEach(() => {
      // import and pass your custom axios instance to this method
    moxios.install()
  })

  afterEach(() => {
      // import and pass your custom axios instance to this method
    moxios.uninstall()
  })

  it("should have 3 inputs and 1 select", () => {
    let wrapper = shallow(<ContactForm  />);
    expect(wrapper.find("input").length).toBe(3);
    expect(wrapper.find("select").length).toBe(1);
  });

  it("should change country on componentDidMount", () => {
    moxios.stubRequest('/wp-admin/admin-ajax.php', {
        status: 200,
        responseText: 'hello'
    });

    let wrapper = mount(<ContactForm country="Germany"  />);
    expect(wrapper.state().contact.country).toBe("Germany");
  });

  it("should change contact name", () => {
    let wrapper = shallow(<ContactForm />);
    wrapper
      .find("input")
      .at(0)
      .simulate("change", { e: {}, target: { value: "test" } });
    expect(wrapper.state().contact.name).toEqual("test");
  });

  it('should show validations', () => {
    let wrapper = shallow(<ContactForm  />);
    wrapper.find('button').simulate('click', {preventDefault: () => {}});
    expect(wrapper.find('.input-error').length).toBe(3);
  })
});

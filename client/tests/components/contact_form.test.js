import React from "react";
import { shallow, mount } from "enzyme";
import moxios from 'moxios';
import ContactForm from "../../components/contact_form";

describe("component ContactForm", () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('should render as expected', () => {
		let wrapper = shallow(<ContactForm />);
		expect(wrapper.getNodes()).toMatchSnapshot();
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

  it("should change contact state", () => {
    let name = 'ale';
    let lastname = 'san';
    let email = 'alesan@gmail.com';
    let e = {};
    let wrapper = shallow(<ContactForm />);
    wrapper
      .find("input")
      .at(0)
      .simulate("change", { e, target: { value: name } });

    wrapper
      .find("input")
      .at(1)
      .simulate("change", { e, target: { value: lastname } });

      wrapper
      .find("input")
      .at(2)
      .simulate("change", { e, target: { value: email } });

    expect(wrapper.state().contact).toEqual({
      name,
      lastname,
      email,
      country: ''
    });
  });

  it('should show validations', () => {
    let wrapper = shallow(<ContactForm  />);
    wrapper.find('button').simulate('click', {preventDefault: () => {}});
    expect(wrapper.find('.input-error').length).toBe(3);
  })
});

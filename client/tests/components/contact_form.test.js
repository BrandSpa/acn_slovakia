import React from "react";
import { shallow, mount, render } from "enzyme";
import ContactForm from "../../components/contact_form";

describe("component ContactForm", () => {
  it("should have 3 inputs and 1 select", () => {
    let wrapper = shallow(<ContactForm />);
    expect(wrapper.find("input").length).toBe(3);
    expect(wrapper.find("select").length).toBe(1);
  });

  it("should change country on componentDidMount", () => {
    let wrapper = mount(<ContactForm country="Germany" />);
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
});

import React from "react";
import { shallow } from "enzyme";
import ContactForm from "../../components/contact_form";

describe("component ContactForm", () => {
  it("should have 3 inputs and 1 select", () => {
    let wrapper = shallow(<ContactForm />);
    expect(wrapper.find("input").length).toBe(3);
    expect(wrapper.find("select").length).toBe(1);
  });
});

import React from "react";
import { shallow, mount } from "enzyme";
import Projects from "../../components/projects";
import ProjectsIcons from "../../components/projects_icons";

describe('component projects', () => {
	it('should change num', () => {
		let mock = jest.fn();
		let wrapper = shallow(<ProjectsIcons onChange={mock} />);
		wrapper.find('a').at(0).simulate('click', {preventDefault: () => {}});
		expect(mock).toHaveBeenCalledWith(1);
	})

})

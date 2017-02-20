import React from 'react';
import { shallow } from 'enzyme';
import Contact from '../../../components/donate/contact';

describe('component contact', () => {
	it('should pass validations', () => {
		let onChange = jest.fn();
		let wrapper = shallow(<Contact onChange={onChange} />);
		wrapper.instance().validateAll();
		expect(onChange).toBeCalledWith({});
	})
})

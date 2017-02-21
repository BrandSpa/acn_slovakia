import React from 'react';
import { shallow, mount } from 'enzyme';
import moxios from 'moxios';
import Donate from '../../../components/donate';

describe('donate component', () => {
	beforeEach(() => {
    moxios.install();
  })

  afterEach(() => {
    moxios.uninstall();
  })

	it('should change section', () => {
		let wrapper = mount(<Donate />);
		wrapper.instance().nextSection();
		expect(wrapper.state().section).toBe(1);
	})

	it('should fetch countries', () => {
			let response = ['Argentina', 'Colombia'];
		moxios.stubRequest('/wp-admin/admin-ajax.php', { response });
		let wrapper = shallow(<Donate />);

		return wrapper
			.instance()
			.fetchCountries()
			.then(res => expect(res).toEqual(['Argentina', 'Colombia']));
	}) 

	it('should validate credit card and stop next section', () => {
		let wrapper = mount(<Donate />);
		wrapper.instance().nextSection();
		wrapper.instance().nextSection();

		let expected = {
			contact: {},
			stripe: {
				number: false,
				cvc: false,
				exp_month: false,
				exp_year: false,
			}
		};

		expect(wrapper.state().errors).toEqual(expected);
		expect(wrapper.state().section).toEqual(1);
	})

	it('should validate contact and stop', () => {
		let wrapper = mount(<Donate />);
		let state = wrapper.state();
		wrapper.setState({...state, stripe: {number: '424242424242424242', 'cvc': '123', 'exp_month': '02', 'exp_year': '2020'}});
		wrapper.instance().nextSection();
		wrapper.instance().nextSection();
		wrapper.instance().nextSection();
		
		let expected = {
			contact: {
				country: false,
				name: false,
				email: false
			},
			stripe: {
				number: true,
				cvc: true,
				exp_month: true,
				exp_year: true
			}
		};

		expect(wrapper.state().errors).toEqual(expected);
		expect(wrapper.state().section).toEqual(2);
	})
})


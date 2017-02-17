import React from 'react';
import { shallow } from 'enzyme';
import CreditCard from '../../../components/donate/credit_card';

describe('donate amount component', () => {
	it("should return stripe number", () => {
		let onlyNum = val => val.replace(/[^0-9]+/, '');
		let maxLength = val => val;
		let onChange = jest.fn();
		let wrapper = shallow(<CreditCard onlyNum={onlyNum} maxLength={maxLength} onChange={onChange} />);
		wrapper.find('input').at(0).simulate('change', {currentTarget: {value: '4242424242424242ale'}});
		let expected = {
			stripe: {
				card_type: '', 
				number: '4242424242424242'
			}, 
			errors: {
				stripe: { number: false }
			}
		};
		expect(onChange.mock.calls[0][0]).toEqual(expected);
	})
	
});
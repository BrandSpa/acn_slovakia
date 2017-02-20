import React from 'react';
import { shallow } from 'enzyme';
import CreditCard from '../../../components/donate/credit_card';

describe('donate amount component', () => {
	it("should return stripe number", () => {
		let onlyNum = val => val.replace(/[^0-9]+/, '');
		let maxLength = val => val;
		let onChange = jest.fn();
		let wrapper = shallow(<CreditCard onChange={onChange} />);
		wrapper.find('input').at(0).simulate('change', {currentTarget: {value: '4242424242424242ale'}});
		let expected = {
			stripe: {
				card_type: '',
				number: '4242424242424242'
			}, 
			errors: {
				stripe: { number: true }
			}
		};

		expect(onChange.mock.calls[0][0]).toEqual(expected);
	})
	
	it('should validate all fields and pass', () => {
		let onlyNum = val => val.replace(/[^0-9]+/, '');
		let maxLength = val => val;
		let onChange = jest.fn();
		let stripe = {
			number: '4242424242424242',
			exp_month: '02',
			exp_year: '20',
			cvc: '123'
		};

		let wrapper = shallow(
			<CreditCard 
				stripe={stripe} 
				onChange={onChange} 
			/>
		);
		
		wrapper.instance().allValidations();
		
		let expected = { errors: {
			stripe: {
				number: true,
				cvc: true,
				exp_month: true,
				exp_year: true
			}
		}};

		expect(onChange.mock.calls[0][0]).toEqual(expected);
	})
});
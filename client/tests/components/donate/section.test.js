import React from 'react';
import { shallow } from 'enzyme';
import moxios from 'moxios';
import Donate from '../../../components/donate';

describe('donate component', () => {
	beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

	it('should change section', () => {
		let wrapper = shallow(<Donate />);
		wrapper.instance().nextSection();
		expect(wrapper.state().section).toBe(1);
	})

	it('should fetch countries', () => {

		moxios
		.stubRequest('/wp-admin/admin-ajax.php', {
        status: 200,
        response: ['Argentina', 'Colombia']
    });



	}) 
})

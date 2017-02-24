import React from "react";
import { shallow, mount } from "enzyme";
import moxios from 'moxios';
import Posts from "../../components/posts";
import axios from 'axios';
import sinon from 'sinon';

describe('Posts component', () => {
	beforeEach(() => {
		moxios.install();
	})

	afterEach(() => {
		moxios.uninstall();
	})

	it('should show 3 posts', () => {
		let posts = [{id: 1}, {id: 2}, {id: 3}];
		let wrapper = mount(<Posts />);
		wrapper.setState({ posts });
		expect(wrapper.find('.grid-item').length).toBe(3);
	})

	it('should get posts on componentWillMount', () => {
		let posts = {data: [{id: 1}, {id: 2}, {id: 3}]};
		const promise = Promise.resolve(posts);
		sinon.stub(axios, 'post', () => promise);
		let wrapper = mount(<Posts />);
		return promise.then(() => {
			expect(wrapper.state().posts).toEqual(posts.data);
			expect(wrapper.find('.grid-item').length).toBe(3);
		});
	})
})

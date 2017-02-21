import React from 'react';
import request from 'axios';
import qs from 'qs';

const Menu = React.createClass({
	getInitialState() {
		return {
			items: []
		}
	},

	componentDidMount() {
		let data = {action: 'get_menu', 'name': this.props.name};
		request
			.post('/wp-admin/admin-ajax.php', data)
			.then(res => this.setState({items: res.data}));
	},

 	render() {
		return (
			<ul className="menu">
				{this.state.items.map((item, i) => {
					return <li><a href={item.url}>{item.title}</a></li>
				})}
			</ul>
		)
	}
});

export default Menu;
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
		let data = qs.stringify({action: 'get_menu', 'name': this.props.name});
		request
			.post('/wp-admin/admin-ajax.php', data)
			.then(res =>  {
				let langs =  res.data.reduce((arr, obj) => {
					obj = {...obj, items: []};
					arr = [...arr, obj];
					return arr;
				}, []);
				console.log(langs);
			});
	},

 	render() {
		let dropdown = 0;
		return (
			<ul className="menu">
				{this.state.items.map((item, i) => {
					return <li key={i}><a href={item.url}>{item.title}</a></li>
				})}
			</ul>
		)
	}
});

export default Menu;
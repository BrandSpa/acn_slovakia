import React from 'react';
import MediaUploader from '../lib/uploader';

const GalleryMetabox = React.createClass({
	getInitialState(){
		return {
			images: [],
			excerpts: []
		}
	},

	getDefaultProps() {
		return {
			images: [],
			excerpts: []
		}
	},
	
	componentWillReceiveProps(props) {
	

	},

	componentDidMount() {
		console.log('props', this.props);
		if(Array.isArray(this.props.images)) {
			this.setState({images: this.props.images});
		}

		if(Array.isArray(this.props.excerpts)) {
			this.setState({excerpts: this.props.excerpts});
		}

	},

	handleChange(ind, type, e) {
		let {images, excerpts} = this.state;
		
		if(type == 'image') {
			images[ind] = e.currentTarget.value;
		}

		if(type == 'excerpt') {
			excerpts[ind] = e.currentTarget.value;
		}

		this.setState({images, excerpts});
	},

	handleAdd(e) {
		e.preventDefault();
		let images = this.state.images.concat(['']);
		let excerpts = this.state.excerpts.concat(['']);
		this.setState({images, excerpts});
	},

	handleRemove(ind, e) {
		e.preventDefault();
		let images = this.state.images.filter((con,i) => i != ind);
		let excerpts = this.state.excerpts.filter((con,i) => i != ind);
		this.setState({ images, excerpts });
	},

	handleClick() {
		MediaUploader.then(res => console.log(res));
	},

	renderInputs(i = 0) {
		return (
			<p key={i}>
			<p>
				<input 
						type="text" 
						name="images[]" 
						placeholder="Image url"
						onClick={this.handleClick}
						onChange={this.handleChange.bind(null, i, 'image')} 
						value={ this.state.images[i] } 
						style={{width: '100%', display: 'blockJ'}}
					/>
			</p>
			<p>
				<textarea
					type="text" 
					name="excerpts[]"
					placeholder="excerpt"
					rows="4"
					value={this.state.excerpts[i]}
					onChange={this.handleChange.bind(null, i, 'excerpt')}
					style={{width: '100%', display: 'block '}}
				>
				</textarea>
			</p>
				<button className="button" onClick={this.handleRemove.bind(null, i)}>Remove</button>
			</p>
		)
	},

	render() {
		const { images = [] } = this.state;
		return (
			<div>
			{ images.map((image, i) => this.renderInputs(i) ) }
			<button onClick={this.handleAdd} className="button">Add</button>
			</div>
		)
	}
});

export default GalleryMetabox;

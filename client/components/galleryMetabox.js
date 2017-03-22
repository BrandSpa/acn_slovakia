import React from 'react';

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
		console.log('props', this.props, props);
	},

	componentDidMount() {
		console.log('props', this.props);
		if(this.props.images.length >= 1 ) {
			this.setState({...this.state, ...this.props});
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
		this.setState({ images });
	},

	renderInputs(i = 0) {
		return (
			<p>
			<p>
				<input 
						type="text" 
						name="images[]" 
						placeholder="Image url"
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
					// onChange={this.handleChange.bind(null, i, 'excerpt')}
					style={{width: '100%', display: 'block '}}
				>{this.state.excerpts[i]}</textarea>
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

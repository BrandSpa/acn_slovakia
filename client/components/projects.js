import React from 'react';

const Projects = React.createClass({
	changeContent(num, e) {
		e.preventDefault();
		console.log('content', num);
	},

	render() {
		let title = 'Mass stipends';
		let text = 'In many regions, the faithful are now so poor that they cannot support their priests. Mass stipends are often the only means of existential help in these regions.  Thanks to 1.2 million mass stipends, the livelihood of every ninth priest, on average, can be assured.';
		let imgUrl = 'http://acninternational.org/wp-content/uploads/2017/02/img9.jpg';

		let styleRight = {
			background: `url(${imgUrl})`,
			'backgroundSize': 'cover',
			height: '500px'
		};
		
		let styleLeft = {
			'background': '#B91325',
			height: '500px'
		};

		return (
			<div class="projects">
				<ul>
					<li><a onClick={this.changeContent.bind(null, 1)} href="#">

						<svg width="68px" height="68px" viewBox="0 0 68 68" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
						
								<defs>
										<polygon id="path-1" points="67.38913 0.803112967 0.518458196 0.803112967 0.518458196 66.1857235 67.38913 66.1857235 67.38913 0.803112967"></polygon>
								</defs>
								<g id="Group-9" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(0.000000, 0.271220)">
										<mask id="mask-2" fill="white">
												<use xlink:href="#path-1"></use>
										</mask>
										<g id="Clip-8"></g>
										<path d="M67.3673112,32.026012 C67.2600797,30.6734635 66.0912564,29.6302188 64.6758007,29.6302188 L3.22679192,29.6302188 C1.81669775,29.6302188 0.647874444,30.6734635 0.540642948,32.026012 C0.513835074,32.3667703 -0.043768705,40.471576 6.54560672,47.2972274 C11.8750121,52.8227547 20.2015377,55.7952158 31.2517434,56.2146107 L31.2517434,61.006197 L21.5365699,61.006197 C20.0460521,61.006197 18.8396977,62.1647753 18.8396977,63.5959602 C18.8396977,65.0271452 20.0460521,66.1857235 21.5365699,66.1857235 L45.9102889,66.1857235 C47.4008067,66.1857235 48.6125226,65.0271452 48.6125226,63.5959602 C48.6125226,62.1647753 47.4008067,61.006197 45.9102889,61.006197 L36.6454876,61.006197 L36.6454876,56.2146107 C47.6956933,55.7952158 56.0275805,52.8227547 61.3569859,47.2972274 C67.9463613,40.471576 67.3941191,32.3667703 67.3673112,32.026012 L67.3673112,32.026012 Z M61.8395276,34.8097454 C61.5017484,37.0797201 60.4669644,40.5973945 57.4055052,43.7743106 C52.7034041,48.6445334 44.811166,51.1137206 33.9539771,51.1137206 C23.1450423,51.1137206 15.2796121,48.6655031 10.5667878,43.8424622 C7.45171286,40.6498188 6.40620578,37.0954474 6.06306499,34.8097454 L61.8395276,34.8097454 Z M46.6501862,13.3734255 C46.6501862,6.44292538 40.7846234,0.80206448 33.5679437,0.80206448 C26.351264,0.80206448 20.4803396,6.44292538 20.4803396,13.3734255 C20.4803396,20.3039256 26.351264,25.9447865 33.5679437,25.9447865 C40.7846234,25.9447865 46.6501862,20.3039256 46.6501862,13.3734255 L46.6501862,13.3734255 Z M41.256442,13.3734255 C41.256442,17.4467981 37.8089494,20.7600175 33.5679437,20.7600175 C29.326938,20.7600175 25.8740839,17.4467981 25.8740839,13.3734255 C25.8740839,9.30005288 29.326938,5.98683346 33.5679437,5.98683346 C37.8089494,5.98683346 41.256442,9.30005288 41.256442,13.3734255 L41.256442,13.3734255 Z" id="Fill-7" fill="#B91325" mask="url(#mask-2)"></path>
								</g>
						</svg>
					</a></li>
					<li><a onClick={this.changeContent.bind(null, 2)} href="#">

					</a></li>
					<li><a onClick={this.changeContent.bind(null, 3)} href="#">

					</a></li>
					<li><a onClick={this.changeContent.bind(null, 4)} href="#">

					</a></li>
					<li><a onClick={this.changeContent.bind(null, 5)} href="#">

					</a></li>
					<li><a onClick={this.changeContent.bind(null, 6)} href="#">

					</a></li>
					<li><a onClick={this.changeContent.bind(null, 7)} href="#">

					</a></li>
					<li><a onClick={this.changeContent.bind(null, 8)} href="#">

					</a></li>
					<li><a onClick={this.changeContent.bind(null, 9)} href="#">

					</a></li>
				</ul>
				<div className="projects__content">
					<div class="col-4 projects__content__content-left" style={styleLeft}>
						<h4>{title}</h4>
						<p>{text}</p>
						<button>DONATE</button>
					</div>
					<div class="col-8 projects__content__content-right" style={styleRight}></div>
				</div>
			</div>
		)
	}
});

export default Projects;
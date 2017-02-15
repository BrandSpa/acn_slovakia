import React from 'react';
import ReactDOM from 'react-dom';
import ProjectsIcons from './projects_icons';
const backgroundColors = {
	1: '#b91325',
	2: '#00355f',
	3: '#6e5785',
	4: '#95a0ad',
	5: '#156734',
	6: '#689038',
	7: '#7a2d04',
	8: '#b27009',
	9: '#e6bb2f',
};

const Projects = React.createClass({

	getInitialState() {
		return {
			bg: '#B91325'
		}
	},

	componentDidMount() {

		setTimeout(() => {
			let left = this.el.querySelector(`.projects__icons li:nth-child(${1})`).offsetLeft;
			this.el.querySelector('.projects__arrow').style.left = `${left}px`;
		}, 1000);
	
	},

	changeContent(num) {
		this.setState({bg: backgroundColors[num]});

		let left = this.el.querySelector(`.projects__icons li:nth-child(${num})`).offsetLeft;
		this.el.querySelector('.projects__arrow').style.left = `${left}px`;
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
			'background': this.state.bg,
			height: '500px'
		};

		return (
			<div class="videos">
  <div class="videos__main">
    <a href="#" class="videos__open-modal" >
  	<img src="https://app.unbouncepreview.com/publish/assets/1532cdcb-a832-465e-9352-749839d5ee18/cd3dab33-fotoslide-1.jpg" />
     </a>
  </div>
  
  <div class="videos__carousel">
      <button class="videos__carousel__up"></button>
    <div class="videos__carousel__container">
  
      <div class="videos__carousel__item">
        <a href="#" class="videos__open-modal" >
          <img src="https://app.unbouncepreview.com/publish/assets/1532cdcb-a832-465e-9352-749839d5ee18/cd3dab33-fotoslide-1.jpg" />
         </a>
        <a href="#" class="videos__open-modal" >
          <img src="https://app.unbouncepreview.com/publish/assets/1532cdcb-a832-465e-9352-749839d5ee18/cd3dab33-fotoslide-1.jpg" />
         </a>
      </div>
      <div class="videos__carousel__item">
          <a href="#" class="videos__open-modal" >
              <img src="https://app.unbouncepreview.com/publish/assets/1532cdcb-a832-465e-9352-749839d5ee18/cd3dab33-fotoslide-1.jpg" />
          </a>
          <a href="#" class="videos__open-modal" >
              <img src="https://app.unbouncepreview.com/publish/assets/1532cdcb-a832-465e-9352-749839d5ee18/cd3dab33-fotoslide-1.jpg" />
          </a>
      </div>
          <div class="videos__carousel__item">
          <a href="#" class="videos__open-modal" >
              <img src="https://app.unbouncepreview.com/publish/assets/1532cdcb-a832-465e-9352-749839d5ee18/cd3dab33-fotoslide-1.jpg" />
          </a>
          <a href="#" class="videos__open-modal" >
              <img src="https://app.unbouncepreview.com/publish/assets/1532cdcb-a832-465e-9352-749839d5ee18/cd3dab33-fotoslide-1.jpg" />
          </a>
      </div>
         <div class="videos__carousel__item">
          <a href="#" class="videos__open-modal" >
              <img src="https://app.unbouncepreview.com/publish/assets/1532cdcb-a832-465e-9352-749839d5ee18/cd3dab33-fotoslide-1.jpg" />
          </a>
          <a href="#" class="videos__open-modal" >
              <img src="https://app.unbouncepreview.com/publish/assets/1532cdcb-a832-465e-9352-749839d5ee18/cd3dab33-fotoslide-1.jpg" />
          </a>
      </div>
         <div class="videos__carousel__item">
          <a href="#" class="videos__open-modal" >
              <img src="https://app.unbouncepreview.com/publish/assets/1532cdcb-a832-465e-9352-749839d5ee18/cd3dab33-fotoslide-1.jpg" />
          </a>
        
      </div>
    </div>
     <button class="videos__carousel__down"></button>
    </div>
   
   
  </div>


		)
	}
});

export default Projects;
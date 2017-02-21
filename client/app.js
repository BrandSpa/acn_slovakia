"use strict";
import multipleRender from "./lib/mutiple_render";
import ContactForm from "./components/contact_form";
import HeaderSlider from "./components/header_slider";
import sectionVideo from './components/section_video';
import Projects from './components/projects';
import Accordion from './components/accordion';
import Posts from './components/posts';
import Donate from './components/donate';
import setMenu from './lib/set_menu';
import setMenuMobile from './lib/set_menu_mobile';

multipleRender(".contact-form", ContactForm);
multipleRender(".header-slider", HeaderSlider);
multipleRender(".section-video", sectionVideo);
multipleRender(".projects-container", Projects);
multipleRender(".bs-accordion", Accordion);
multipleRender(".bs-posts", Posts);
multipleRender(".bs-donate-react", Donate);

setMenu();
setMenuMobile();

$('.bs-donate').on('click', (e) => {
	e.preventDefault();
	console.log('donate');
});

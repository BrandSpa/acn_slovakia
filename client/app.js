"use strict";
import multipleRender from "./lib/mutiple_render";
import ContactForm from "./components/contact_form";
import HeaderSlider from "./components/header_slider";
import sectionVideo from './components/section_video';
import Projects from './components/projects';
import Accordion from './components/accordion';
import Posts from './components/posts';

multipleRender(".contact-form", ContactForm);
multipleRender(".header-slider", HeaderSlider);
multipleRender(".section-video", sectionVideo);
multipleRender(".projects-container", Projects);
multipleRender(".bs-accordion", Accordion);
multipleRender(".bs-posts", Posts);

const currentLang = $('.current-lang > a');
currentLang.addClass('dropdown');
let langs = $('.lang-item').not( $(".current-lang") );
console.log(langs);
const newText = `${currentLang.text()} <i class="ion-chevron-down"></i>`;
currentLang.html(newText);
"use strict";
import multipleRender from "./lib/mutiple_render";
import ContactForm from "./components/contact_form";
import HeaderSlider from "./components/header_slider";
import sectionVideo from './components/section_video';
import Projects from './components/projects';
import Accordion from './components/accordion';
import Posts from './components/posts';
import Donate from './components/donate';
import Menu from './components/menu';

multipleRender(".contact-form", ContactForm);
multipleRender(".header-slider", HeaderSlider);
multipleRender(".section-video", sectionVideo);
multipleRender(".projects-container", Projects);
multipleRender(".bs-accordion", Accordion);
multipleRender(".bs-posts", Posts);
multipleRender(".bs-donate-react", Donate);
multipleRender(".bs-menu-container", Menu);

function setMenu() {
	const $menu = $('.menu');
	const currentLang = $('.menu .current-lang > a');
	$('.menu .current-lang').addClass('dropdown');
	$('.menu .current-lang').append('<div class="dropdown-content"></div>');
	let langs = $('.menu .lang-item').not( $(".current-lang") );

	currentLang.on('click', (e) => {
		e.preventDefault();
		const $dropdown = $menu.find('.dropdown-content');
		
		if($dropdown.hasClass('dropdown-content--show')) {
			$dropdown.removeClass('dropdown-content--show');
			return;
		}
		
		$dropdown.addClass('dropdown-content--show');
	});

	langs.each(function() {
		$menu.find('.dropdown-content').append($(this).html());
		$(this).remove();
	});

	const newText = `${currentLang.text()} <i class="ion-chevron-down"></i>`;
	currentLang.html(newText);
}

setMenu();

function setMenuMobile() {
	$('.open-menu').on('click', () => {
		
		if($('.menu--mobile').hasClass('menu--mobile--open')) {
			$(document.body).css({'margin-left': '200px'});
			$('.menu--mobile').removeClass('menu--mobile--open');

		} else {
			$(document.body).css({'margin-left': '0'});
			$('.menu--mobile').addClass('menu--mobile--open');
		}

	});
	
}

setMenuMobile();
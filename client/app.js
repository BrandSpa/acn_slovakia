'use strict';
import 'babel-polyfill';
import WebFont from 'webfontloader';
import multipleRender from 'react-multiple-render';
//React components :)
import ContactForm from './components/contactForm';
import HeaderSlider from './components/headerSlider';
import sectionVideo from './components/sectionVideo';
import Projects from './components/projects';
import Accordion from './components/accordion';
import Posts from './components/posts';
import Donate from './components/donate';
import CampaignsSlider from './components/campaignsSlider';
import DownloadPdf from './components/downloadPdf';
import GalleryHeader from './components/galleryHeader';
import ProjectsAbout from './components/projectsAbout';

//jquery stuff :(
import setMenu from './lib/set_menu';
import setMenuMobile from './lib/set_menu_mobile';
import donateRedirect from './lib/donate_redirect';
import smoothScroll from './lib/smoothScroll';
import scrollViaCrucisNav from './lib/scrollViaCrucisNav';
import toggleViaCrucisNav from './lib/toggleViaCrucisNav';

WebFont.load({
  google: {families: ['Source Sans Pro:400,600,700']},
  custom: {families: ['Ionicons'], testStrings: {Ionicons: '\uf10c\uf109'}},
  fontinactive: (familyName, fvd) => {
    console.error(familyName + ' failed to load');
  }
});

multipleRender(HeaderSlider, '.header-slider');
multipleRender(ContactForm, '.contact-form');
multipleRender(Posts, '.bs-posts');
multipleRender(Donate, '.bs-donate-react');
multipleRender(Projects, '.projects-container');
multipleRender(Accordion, '.bs-accordion', );
multipleRender(sectionVideo, '.section-video');
multipleRender(CampaignsSlider, '.bs-campaings-slider', );
multipleRender(DownloadPdf, '.bs-download-pdf');
multipleRender(GalleryHeader, '.bs-gallery-header');
multipleRender(ProjectsAbout, '.bs-projects-about');

setMenu();
setMenuMobile();
donateRedirect();
smoothScroll();
toggleViaCrucisNav();
scrollViaCrucisNav();

//.sticky-menu
function stickMenu() {
  const $nav = $('.nav');
  const $stickyMenu = $('.sticky-menu');
  const $parentSticky = $stickyMenu ? $('.sticky-menu').parent().offset().top : 0;
  let stickyMenuTop = $stickyMenu ? $stickyMenu.offset().top : 0;
  let navTop = $nav ? $nav.offset().top : 0;
  if(navTop > stickyMenuTop) {
    if(stickyMenuTop < $parentSticky) {
      $stickyMenu.css({marginTop: `${stickyMenuTop}px` });
    }
  }
}

  window.addEventListener('scroll', stickMenu);

function toggleMenu() {
  $('.dropdown-trigger').on('click', function(e) {
    e.preventDefault();
    const $list = $(this).parent().find('.dropdown-list');
    if($list.hasClass('dropdown-list--show')) {
      $list.removeClass('dropdown-list--show');
    } else {
       $list.addClass('dropdown-list--show');
    }
   
  })
}

toggleMenu();
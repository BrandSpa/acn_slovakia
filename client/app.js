'use strict';
import 'babel-polyfill';
import WebFont from 'webfontloader';
import multipleRender from 'react-multiple-render';
//React components :)
import ContactForm from './components/contact_form';
import HeaderSlider from './components/header_slider';
import sectionVideo from './components/section_video';
import Projects from './components/projects';
import Accordion from './components/accordion';
import Posts from './components/posts';
import Donate from './components/donate';
import CampaignsSlider from './components/campaigns_slider';
import DownloadPdf from './components/download_pdf';
//jquery stuff :(
import setMenu from './lib/set_menu';
import setMenuMobile from './lib/set_menu_mobile';
import donateRedirect from './lib/donate_redirect';
import smoothScroll from './lib/smoothScroll';
import scrollViaCrucisNav from './lib/scrollViaCrucisNav';

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

setMenu();
setMenuMobile();
donateRedirect();
smoothScroll();
toggleViaCrucisNav();
scrollViaCrucisNav();

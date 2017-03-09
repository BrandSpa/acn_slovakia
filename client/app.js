'use strict';
import 'babel-polyfill';
import WebFont from 'webfontloader';
import multipleRender from './lib/mutiple_render';
import ContactForm from './components/contact_form';
import HeaderSlider from './components/header_slider';
import sectionVideo from './components/section_video';
import Projects from './components/projects';
import Accordion from './components/accordion';
import Posts from './components/posts';
import Donate from './components/donate';
import setMenu from './lib/set_menu';
import setMenuMobile from './lib/set_menu_mobile';
import donateRedirect from './lib/donate_redirect';
import CampaignsSlider from './components/campaigns_slider';
import DownloadPdf from './components/download_pdf';
import debounce from 'lodash/debounce';

WebFont.load({
  google: {families: ['Source Sans Pro:400,600,700']},
  custom: {families: ['Ionicons'], testStrings: {Ionicons: '\uf10c\uf109'}},
  fontinactive: (familyName, fvd) => {
    console.error(familyName + ' failed to load');
  }
});

multipleRender('.header-slider', HeaderSlider);
multipleRender('.contact-form', ContactForm);
multipleRender('.bs-posts', Posts);
multipleRender('.bs-donate-react', Donate);
multipleRender('.projects-container', Projects);
multipleRender('.bs-accordion', Accordion);
multipleRender('.section-video', sectionVideo);
multipleRender('.bs-campaings-slider', CampaignsSlider);
multipleRender('.bs-download-pdf', DownloadPdf);

setMenu();
setMenuMobile();
donateRedirect();

function smoothScroll() {
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      event.preventDefault();

      const hash = this.hash;
      const less = $('.nav').height();
      const scrollTop = ($(hash).offset().top - less);
     
      $('html, body').animate({ scrollTop }, 800, () => {});

    }
  })

}

smoothScroll();

function toggleViaCrucisNav() {
  if($('.via-crucis-toggle')) {
     $('.via-crucis-toggle').on('click', e => {
      e.preventDefault();
      $('.via-crucis-nav').toggleClass( "via-crucis-nav--open" );
    })
  }
 
}

toggleViaCrucisNav();

let onScroll =  debounce(() => {
  if($('.via-crucis-nav') && $('.nav') && window.outerHeight <= 767) {
    let navTop = $('.nav').offset().top;
    let viaCrucisTop = $('.via-crucis-nav').offset().top; 
    console.log('nea', navTop > viaCrucisTop);
  }
}, 200);

window.addEventListener('scroll', onScroll);


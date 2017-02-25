"use strict";
import WebFont from 'webfontloader';
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
import donateRedirect from './lib/donate_redirect';
import CampaignsSlider from './components/campaigns_slider';

WebFont.load({
	google: {
    families: ['Source Sans Pro:400,600,700']
  },
	custom: {
		families: ['Ionicons']
	},
	 fontloading: function(familyName, fvd) {
            console.log( "loading " + familyName );
        },
        fontactive: function(familyName, fvd) {
            console.log( familyName + " loaded" );
        },
        fontinactive: function(familyName, fvd) {
            console.log( familyName + " failed to load" );
        }
});


multipleRender(".header-slider", HeaderSlider);
multipleRender(".contact-form", ContactForm);
multipleRender(".bs-posts", Posts);
multipleRender(".bs-donate-react", Donate);
multipleRender(".projects-container", Projects);
multipleRender(".bs-accordion", Accordion);
multipleRender(".section-video", sectionVideo);
multipleRender(".bs-campaings-slider", CampaignsSlider);

setMenu();
setMenuMobile();
donateRedirect();


<?php
/*
 * BrandSpa (http://brandspa.com)
 * Alejandro Sanabria <alejandro@brandspa.com>
 * Copyright 2017 BrandSpa
 */
 
register_nav_menus(
  array(
    'header' => __('Header nav'),
    'footer' => __('Footer nav')
  )
);

function modify_jquery() {
	if (!is_admin()) {
		// comment out the next two lines to load the local copy of jQuery
		wp_deregister_script('jquery');
		wp_register_script('jquery', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js', false, '3.1.1', true); 
		wp_enqueue_script('jquery');
	}
}

add_action('init', 'modify_jquery');

//libs
require('lib/clean_menu.php');
require('lib/space_to_lodash.php');
require('lib/translation.php');

//apis
require('apis/index.php');

//options
require('options/index.php');

//shortcodes
require('shortcodes/contact_form.php');
require('shortcodes/header_slider.php');
require('shortcodes/projects.php');
require('shortcodes/section_video.php');
require('shortcodes/accordion.php');
require('shortcodes/donate.php');
require('shortcodes/posts.php');
require('shortcodes/contact_info.php');

function show_posts() {
	if(function_exists('pll_current_language')) {
		$lang = pll_current_language();
		if($lang == 'es' || $lang == 'en') return true;
		return false;
	}

	return false;
}

function show_donate() {
	$country = getCountry();
	if( !in_array($country, getOfficesCountries()) ) return true;
	return false;
}





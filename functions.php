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

$vc = '';


add_action( 'init', 'create_post_type' );
function create_post_type() {
  register_post_type( 'acme_product',
    array(
      'labels' => array(
        'name' => __( 'Products' ),
        'singular_name' => __( 'Product' )
      ),
      'public' => true,
      'has_archive' => true,
    )
  );
}

function modify_jquery() {
	if (!is_admin()) {
		// comment out the next two lines to load the local copy of jQuery
		wp_deregister_script( 'wp-embed' );
		wp_deregister_script('jquery');
		wp_register_script('jquery', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js', false, '3.1.1', true); 
		wp_enqueue_script('jquery');
	}
}

add_action('init', 'modify_jquery');

function deactivate_plugin_conditional() {
	if(is_plugin_active('mpc-massive/mpc-massive.php')) {
		deactivate_plugins('mpc-massive/mpc-massive.php'); 
	} 

	if(is_plugin_active('conditional-menus/init.php')) {
		deactivate_plugins('conditional-menus/init.php'); 
	}
}

add_action( 'init', 'deactivate_plugin_conditional' );

//libs
require('lib/clean_menu.php');
require('lib/space_to_lodash.php');
require('lib/translation.php');
require('lib/is_mobile.php');
require('lib/infusionsoft.php');

//translations
require('translations/index.php');

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
require('shortcodes/posts_list.php');
require('shortcodes/campaigns_slider.php');
require('shortcodes/download_pdf.php');
require('shortcodes/share.php');

//metaboxes
require('metaboxes/image_square.php');
require('metaboxes/geolify.php');

function get_lang() {
	if(function_exists('pll_current_language')) {
		return pll_current_language();
	}
	
	return '';
}

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

function bs_home_url() {
	$home = '/';
	if(function_exists('pll_home_url')) {
		$home = pll_home_url();
	}
	return $home;
}

function bs_in_office($country) {
	return in_array($country, getOfficesCountries());
}

function bs_logo_url() {
	$country = getCountry();

	if(!bs_in_office($country)) {
		$country = 'default';
	}
	
	$country = str_replace(' ', '_', $country);
	$url = get_option("logo_". $country);
	$url = str_replace('http:', '',   $url);
	return $url;
}

//remove emojies script
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' ); 

//add more compression
add_filter('jpeg_quality', function($arg) {
	return 80;
});

function replace_office_texts() {
	$text = gett('ACN, during 70 years helping Christians in need');

	if(bs_in_office(getCountry())) {
		$text = gett('TO LEARN MORE ABOUT [office_name], VISIT [office_url]');
		$text = str_replace('[office_url]', get_option('url_' . space_to_lodash( getCountry() ) ), $text);
		$text = str_replace('[office_name]', get_option('name_' . space_to_lodash( getCountry() ) ), $text);
	}

	return $text;
}

// fallback language is English whatever the default language
// add_filter( 'pll_preferred_language', 'my_language_fallback' );
 
// function my_language_fallback( $slug ) {
//     return $slug === false ? 'es' : $slug;
// }

function cleanQuote($val) {
	return str_replace("'", "\u0027", $val);
}

function geolify($post) {
	if($post) {
		$countries = get_post_meta($post->ID, 'geolify_countries_key', true) ? get_post_meta($post->ID, 'geolify_countries_key', true) : [] ;
		$urls = get_post_meta($post->ID, 'geolify_urls_key', true);
		$key = array_search(getCountry(), $countries);
		
		if(isset($urls[$key]) && !empty($urls[$key])) {
			header('Location:'. $urls[$key]);
			exit;
		}
	}
}

function redirectToLang() {
	$lang = getCountryLang(getCountry());
	if(!isset($_COOKIE['bs-lang']) && empty($_COOKIE['bs-lang'])) {
		$url = pll_the_languages( array( 'raw' => 1 ) )[$lang]['url'];
		setcookie('bs-lang', $lang);
		header('Location:'. $url);
		exit;
	} 
}

/**
**	Not redirect if the call is via ajax
**/

if(function_exists('wp_doing_ajax') && !wp_doing_ajax()) {
	redirectToLang();
}

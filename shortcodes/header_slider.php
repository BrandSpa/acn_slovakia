<?php

function bs_header_slider_sc($atts, $content = null) {
	$attributes = [];

	foreach([1,2,3,4] as $i) {
    $attributes =   array_merge($attributes, ['title-'.$i => 'this is a title']);
    $attributes = array_merge($attributes, ['subtitle-'.$i => 'this is a subtitle']);
    $attributes = array_merge($attributes, ['url-'.$i => '#']);
  }

  $at = shortcode_atts( $attributes , $atts );

  ob_start();
?>

<div 
  class="header-slider" 
  data-props='{"slides": [
      {"title": "this is a title", "subtitle": "nea", "imgUrl": "http://acninternational.org/wp-content/uploads/2016/11/pope.jpg"},
      {"title": "this is a title", "subtitle": "nea", "imgUrl": "http://religious-freedom-report.org/wp-content/uploads/2016/10/home-isis.jpg"}
    ]
  }'
></div>

<?php

  return ob_get_clean();
}

  add_shortcode( 'bs_header_slider', 'bs_header_slider_sc' );
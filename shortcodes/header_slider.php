<?php

function bs_header_slider_sc($atts, $content = null) {
	$attributes = [];

	foreach([1,2,3,4] as $i) {
    array_push($attributes, 'title-'.$i);
    array_push($attributes, 'subtitle-'.$i);
    array_push($attributes, 'url-'.$i);
  }

  $at = shortcode_atts( $attributes , $atts );

  ob_start();
?>



<?php

  return ob_get_clean();
}

  add_shortcode( 'bs_header_slider', 'bs_header_slider_sc' );
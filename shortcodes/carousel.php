<?php

function bs_carousel_sc($atts, $content = null) {
	$attributes = [ 
    'items' => ''
	];

  $at = shortcode_atts( $attributes , $atts );
	
	$items = array_map(function($item) {
		$item['imgUrl'] = isset($item['image']) ?  wp_get_attachment_url($item['image']) : '';
		return $item;
	}, vc_param_group_parse_atts( $at['items'] ));;
  ob_start();
?>

<div
  class="bs-carousel" 
  data-props='{
    "items": <?php echo cleanQuote(json_encode($items))  ?>
  }'
>
</div>

<?php
  return ob_get_clean();
}

  add_shortcode( 'bs_carousel', 'bs_carousel_sc' );

  function bs_carousel_vc() {
    $subparams = [
	
    ];

    $params = [
      [
        'type' => 'param_group',
        'param_name' => 'items',
        'params' => $subparams,
				'value' => ''
      ]
    ];

    vc_map(
      array(
        "name" =>  "BS Carousel",
        "base" => "bs_carousel",
        "category" =>  "BS",
				"as_parent" => array('only' => 'single_img'), // Use only|except attributes to limit child shortcodes (separate multiple values with comma)
				"content_element" => true,
				"show_settings_on_create" => false,
				"is_container" => true,
        "params" => $params,
				"js_view" => 'VcColumnView'
      ) 
    );
  }

  add_action( 'vc_before_init', 'bs_carousel_vc' );

if ( class_exists( 'WPBakeryShortCodesContainer' ) ) {
    class WPBakeryShortCode_bs_carousel extends WPBakeryShortCodesContainer {
    }
}

	vc_map( array(
    "name" => __("Gallery Image", "my-text-domain"),
    "base" => "single_img",
    "content_element" => true,
    "as_child" => array('only' => 'your_gallery'), // Use only|except attributes to limit parent (separate multiple values with comma)
    "params" => array(
        // add params same as with any other content element
        array(
            "type" => "textfield",
            "heading" => __("Extra class name", "my-text-domain"),
            "param_name" => "el_class",
            "description" => __("If you wish to style particular content element differently, then use this field to add a class name and then refer to it in your css file.", "my-text-domain")
        )
    )
) );
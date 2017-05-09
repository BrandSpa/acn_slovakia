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
			[
        "type" => "attach_image",
        "heading" => "enter image",
        "param_name" => "image"
      ],
      [
        "type" => "textarea_raw_html",
        "heading" => "enter content",
        "param_name" => "content"
      ]
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
        "params" => $params
      ) 
    );
  }

  add_action( 'vc_before_init', 'bs_carousel_vc' );
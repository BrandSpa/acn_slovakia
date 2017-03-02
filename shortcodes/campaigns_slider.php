<?php

function bs_campaigns_slider_sc($atts, $content = null) {
  $attributes = [ 
    'slides' => '',
		'interval' => '3000'
	];

  $at = shortcode_atts( $attributes , $atts );
	
	$slides = array_map(function($slide) {
		$slide['image'] = wp_get_attachment_url($slide['image']);
		return $slide;
	}, vc_param_group_parse_atts( $at['slides'] ));

  ob_start();
?>

<div
	class="bs-campaings-slider" 
	data-props='{"slides": <?php echo cleanQuote(json_encode( $slides )); ?>, "interval": <?php echo $at["interval"] ?>}'
>
</div>

<?php

  return ob_get_clean();
}

add_shortcode( 'bs_campaigns_slider', 'bs_campaigns_slider_sc' );
add_action( 'vc_before_init', 'bs_campaigns_slider_vc' );

function bs_campaigns_slider_vc() {
	$params = array(
		[
			'type' => 'textfield',
			'heading' => 'Enter interval',
			'value' => '3000',
			'param_name' => 'interval'
		],
    array(
      'type' => 'param_group',
      'value' => '',
      'param_name' => 'slides',
				'params' => array(
					array(
						'type' => 'attach_image',
						'heading' => 'Enter image',
            'param_name' => 'image',
					),
					array(
            'type' => 'textfield',
            'value' => '',
            'heading' => 'Enter url',
            'param_name' => 'url',
          ),
        	array(
            'type' => 'textfield',
            'value' => '',
            'heading' => 'Enter title',
            'param_name' => 'title',
          ),
					array(
          	'type' => 'textarea',
            'value' => '',
            'heading' => 'Enter content',
            'param_name' => 'content',
          ),
					array(
						'type' => 'textfield',
						'heading' => 'url embed video',
						'param_name' => 'url'
					),
					array(
						'type' => 'colorpicker',
						'heading' => 'color',
						'param_name' => 'bg'
					),
    	)
  	)
);

	vc_map(
    [
      "name" =>  "BS Campaign Slider",
      "base" => "bs_campaigns_slider",
      "category" =>  "BS",
      'params' => $params
		]
	);
}
<?php

function bs_campaigns_slider_sc($atts, $content = null) {
	$attributes = [ 'slides' => '' ];
  $at = shortcode_atts( $attributes , $atts );
	$slides = array_map(function($slide) {
		$slide['image'] = wp_get_attachment_url($slide['image']);
		return $slide;
	}, vc_param_group_parse_atts( $at['slides'] ));
  ob_start();
?>

<div 
	class="bs-campaings-slider" 
	data-props='{<?php echo json_encode( $slides ); ?>}'
>
</div>

<?php

  return ob_get_clean();
}

add_shortcode( 'bs_campaigns_slider', 'bs_campaigns_slider_sc' );
add_action( 'vc_before_init', 'bs_campaigns_slider_vc' );

function bs_campaigns_slider_vc() {
	vc_map(
    array(
        "name" =>  "BS Campaign Slider",
        "base" => "bs_campaigns_slider",
        "category" =>  "BS",
        'params' => array(
            // params group
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
                        'heading' => 'Enter your title',
                        'param_name' => 'title',
                    ),
										array(
                        'type' => 'textarea',
                        'value' => '',
                        'heading' => 'Enter your content',
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
        )
    )
	);
}
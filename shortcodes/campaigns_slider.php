<?php

function bs_campaigns_slider_sc($atts, $content = null) {
	$attributes = [
		'slides' => ''
	];

  $at = shortcode_atts( $attributes , $atts );
	$imgUrl = wp_get_attachment_image_src($at['image'], 'full')[0];


  ob_start();
?>

<?php var_dump(vc_param_group_parse_atts( $at['slides'] )); ?>

<div 
	class="bs-campaings-slider" 
	data-props='{}'
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
                    )
                )
            )
        )
    )
	);
}
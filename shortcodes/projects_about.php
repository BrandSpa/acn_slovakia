<?php

function bs_projects_about_sc($atts, $content = null) {
	$attributes = [ 
    'projects' => '',
		'interval' => 5000
	];

  $at = shortcode_atts( $attributes , $atts );
	
	$projects = array_map(function($slide) {
		$slide['image'] = wp_get_attachment_url($slide['image']);
		return $slide;
	}, vc_param_group_parse_atts( $at['slides'] ));

  ob_start();
?>

<div
  class="bs-projects-about" 
  data-props='{
    "projects": <?php echo json_encode($projects) ?>, 
    "interval": "<?php echo $at["interval"] ?>"
  }'
></div>

<?php
  return ob_get_clean();
}

  add_shortcode( 'bs_projects_about', 'bs_projects_about_sc' );

  function bs_projects_about_vc() {
    $subparams = [
      [
        "type" => "attach_image",
        "heading" => "enter image",
        "param_name" => "image"
      ],
      [
        "type" => "textfield",
        "heading" => "enter title",
        "param_name" => "title"
      ],
      [
        "type" => "textarea",
        "heading" => "enter content",
        "param_name" => "content"
      ],
			[
				"type" => "colorpicker",
				"heading" => "enter color",
				"param_name" => "color"
			],
			[
				"type" => "textfield",
        "heading" => "enter number",
        "param_name" => "number"
			],
			[
				"type" => "textfield",
        "heading" => "enter number text",
        "param_name" => "number_text"
			],
			[
				"type" => "textfield",
        "heading" => "enter post category",
        "param_name" => "post_category"
			]
    ];

    $params = [
      [
        "type" => "textfield",
        "heading" => "enter interval",
        "param_name" => "interval",
        "value" => 5000
      ],
      [
        'type' => 'param_group',
        'value' => '',
        'param_name' => 'slides',
        'params' => $subparams
      ]
    ];

    vc_map(
      array(
        "name" =>  "BS Projects About",
        "base" => "bs_projects_about",
        "category" =>  "BS",
        "params" => $params
      ) 
    );
  }

  add_action( 'vc_before_init', 'bs_projects_about_vc' );
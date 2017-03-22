<?php

function bs_projects_about_sc($atts, $content = null) {
	$attributes = [ 
    'projects' => ''
	];

  $at = shortcode_atts( $attributes , $atts );
	
	$projects = array_map(function($project) {
		$project['image'] = isset($project['image']) ?  wp_get_attachment_url($project['image']) : '';
		return $project;
	}, vc_param_group_parse_atts( $at['projects'] ));

  ob_start();
?>

<div
  class="bs-projects-about" 
  data-props='{
    "projects": <?php echo cleanQuote(json_encode($projects)) ?>
  }'
>
</div>

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
        'type' => 'param_group',
        'param_name' => 'projects',
        'params' => $subparams,
				'value' => ''
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
<?php
/**
** 	
**/

add_shortcode( 'bs_example', 'bs_example_sc' );

function bs_example_sc($atts, $content = null) {
	$attributes = [
		'title' => '',
		'subtitle' => '',
    'image' => ''
  ];

  $at = shortcode_atts( $attributes , $atts );

  ob_start();
?>


<div>
<img src="<?php echo wp_get_attachment_url($at['image']) ?>" alt="">
<h1><?php echo $at['title'] ?></h1> 
<h3><?php echo $at['subtitle'] ?></h3>
<p><?php echo $content ?></p>
</div>

<script>
	onload(function() {
		//jquery stuff iría acá

	});
</script>
<?php

  return ob_get_clean();
}


add_action( 'vc_before_init', 'bs_example_vc' );

  function bs_example_vc() {
		$params = [
			[
        "type" => "textfield",
        "heading" => "Title",
        "param_name" => "title",
        "value" => ''
			],
      [
        "type" => "textfield",
        "heading" => "Subtitle",
        "param_name" => "subtitle",
        "value" => ''
			],
			[
        "type" => "attach_image",
        "heading" => "Image",
        "param_name" => "image",
        "value" => ''
			],
      [
        "type" => "textarea_html",
        "heading" => "Contenido",
        "param_name" => 'content',
        "value" => ""
      ]
		];

  	vc_map(
      array(
        "name" =>  "BS Example",
        "base" => "bs_example",
        "category" =>  "BS",
        "params" => $params
      ) 
    );
  }


<?php
/**
** 	
**/

add_shortcode( 'bs_example', 'bs_example_sc' );

function bs_example_sc($atts, $content = null) {
	$attributes = [
		'name' => '',
		'lastname' => ''
  ];

  $at = shortcode_atts( $attributes , $atts );

  ob_start();
?>
<?php var_dump($at) ?>
<form action="">
	<div class="input-container">
		<input type="text" placeholder="<?php echo $at['name'] ?>" name="name">
	</div>
		<div class="input-container">
		<input type="text" placeholder="<?php echo $at['lastname'] ?>" name="lastname">
	</div>
	<button>Guardar</button>
</form>

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
        "type" => "textarea_html",
        "heading" => "Content",
        "param_name" => "content",
        "value" => ''
			],
      [
        "type" => "exploded_textarea",
        "heading" => "Name",
        "param_name" => "name",
        "value" => ''
			],
			[
        "type" => "textfield",
        "heading" => "Lastname",
        "param_name" => "lastname",
        "value" => ''
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


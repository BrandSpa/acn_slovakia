<?php

function bs_julian_sc($atts, $content = null) {
	$attributes = [
		'name' => 'julian'
  ];

  $at = shortcode_atts( $attributes , $atts );
	
  ob_start();
?>

<form action="" class="julian-form`">
	<input type="text" name="name" value="" />
</form>

<script>
	onLoad(function() {
			jQuery('.julian-form').on('submit, function(e) {
				console.log($(this).serialize());
		});
	})
</script>

<?php

  return ob_get_clean();
}

add_shortcode( 'bs_julian', 'bs_julian_sc' );

add_action( 'vc_before_init', 'bs_julian_vc' );

function bs_julian_vc() {
		$params = [
			[
        "type" => "textfield",
        "heading" => "Nombre",
        "param_name" => "name",
        "value" => 'Julian'
			]
		];

  	vc_map(
      array(
        "name" =>  "BS Julian",
        "base" => "bs_julian",
        "category" =>  "BS",
        "params" => $params
      ) 
    );
  }


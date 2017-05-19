<?php
add_shortcode( 'bs_candle', 'bs_candle_sc' );

function bs_candle_sc($atts, $content = null) {
	$attributes = [
		"width" => "200px"
	];

  $at = shortcode_atts( $attributes , $atts );

  ob_start();
?>

<style>

.candle {
	animation: show 8s ease-in;
}

@keyframes show {
  0%{ opacity: 0}
  100%{ opacity: 1}
}

</style>
<div class="candle-container">
<img src="<?php echo get_template_directory_uri() ?>/public/img/candle_fire.png" class="candle" alt="">
<img src="<?php echo get_template_directory_uri() ?>/public/img/candle_base.png" alt="">
</div>


<script>
	onload(function() {
		//jquery stuff

	});
</script>
<?php

  return ob_get_clean();
}

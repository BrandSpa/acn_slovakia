<?php
function bs_share_sc($atts, $content = null) {
	$attributes = [
		'content' => '',
    'btn_title' => ''
  ];

  $at = shortcode_atts( $attributes , $atts );
	$props = [
		'content' => $content,
    'btnTitle' => $at['btn_title']
	];
	
	$current_url = esc_url($_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']);

  ob_start();
?>

<div class="bs-share">
	<a href="https://www.facebook.com/sharer/sharer.php?u=<?php echo $current_url ?>" target="blank">
		<i class="ion-social-twitter"></i>
	</a>

	<a href="https://twitter.com/intent/tweet?text=<?php echo $current_url ?>&hashtags=VIACRUCISPORAFRICA" target="blank">
		<i class="ion-social-facebook"></i>
	</a>
</div>
<?php
  return ob_get_clean();
}

add_shortcode( 'bs_share', 'bs_share_sc' );
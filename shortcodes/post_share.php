<?php

function bs_post_share_sc($atts, $content = null) {
	$attributes = [
		'name-placeholder' => 'Name',
		'lastname-placeholder' => 'Lastname',
		'email-placeholder' => 'Email',
		'country-placeholder' => 'Select country',
		'name-validation' => 'Name required',
		'lastname-validation' => 'lastname required',
		'email-validation' => 'Email required',
		'button-text' => gett('Pray')
	];

  $at = shortcode_atts( $attributes , $atts );

  ob_start();
?>

	<?php 
	$main_dir = str_replace('apis', '', __DIR__);
	require($main_dir . '/templates/post_share.php') 
	?>

<?php

  return ob_get_clean();
}

add_shortcode( 'bs_share_post', 'bs_share_post_sc' );
add_action( 'vc_before_init', 'bs_share_post_vc' );

  function bs_share_post_vc() {
		$params = [];

  	vc_map(
      array(
        "name" =>  "BS Contact Form",
        "base" => "bs_share_post",
        "category" =>  "BS",
        "params" => $params
      ) 
    );
  }
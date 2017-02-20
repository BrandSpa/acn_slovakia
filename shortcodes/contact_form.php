<?php

function bs_contact_form_sc($atts, $content = null) {
	$attributes = [
		'name-placeholder' => 'Name',
		'lastname-placeholder' => 'Lastname',
		'email-placeholder' => 'Email',
		'country-placeholder' => 'Select country',
		'name-validation' => 'Name required',
		'lastname-validation' => 'lastname required',
		'email-validation' => 'Email required',
		'button-text' => 'PRAY'
	];

  $at = shortcode_atts( $attributes , $atts );

  ob_start();
?>

<div 
	class="contact-form" 
	data-props='{
		"country": "<?php echo getCountry() ?>",
		"texts": {
			"button": "<?php echo $at['button-text'] ?>"
		},
		"placeholders": {
			"name": "<?php echo $at['name-placeholder'] ?>",
			"lastname": "<?php echo $at['lastname-placeholder'] ?>",
			"email": "<?php echo $at['email-placeholder'] ?>",
			"country": "<?php echo $at['country-placeholder'] ?>"
		},
		"validationMessages": {
			"name": "<?php echo $at['name-validation'] ?>",
			"lastname": "<?php echo $at['lastname-validation'] ?>",
			"email": "<?php echo $at['email-validation'] ?>"
		},
		"redirect": "<?php echo get_option('subscribe_redirect') ?>"
	}'
>
</div>

<?php

  return ob_get_clean();
}

add_shortcode( 'bs_contact_form', 'bs_contact_form_sc' );
add_action( 'vc_before_init', 'bs_contact_form_vc' );

  function bs_contact_form_vc() {
		$params = [
			[
        "type" => "textfield",
        "heading" => "name placeholder",
        "param_name" => "name-placeholder",
        "value" => 'Name'
			],
			[
        "type" => "textfield",
        "heading" => "lastname placeholder",
        "param_name" => "lastname-placeholder",
        "value" => 'Lastname'
			],
			[
        "type" => "textfield",
        "heading" => "email placeholder",
        "param_name" => "email-placeholder",
        "value" => 'Email'
			],

				[
        "type" => "textfield",
        "heading" => "name validation",
        "param_name" => "name-validation",
        "value" => 'Name required'
			],
			[
        "type" => "textfield",
        "heading" => "lastname validation",
        "param_name" => "lastname-validation",
        "value" => 'Lastname required'
			],
			[
        "type" => "textfield",
        "heading" => "email validation",
        "param_name" => "email-validation",
        "value" => 'Email required'
			],

			[
        "type" => "textfield",
        "heading" => "button text",
        "param_name" => "button-text",
        "value" => 'PRAY'
			],
	];

  	vc_map(
      array(
        "name" =>  "BS Contact Form",
        "base" => "bs_contact_form",
        "category" =>  "BS",
        "params" => $params
      ) 
    );
  }


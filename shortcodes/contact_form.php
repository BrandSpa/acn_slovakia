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
		'button-text' => gett('Pray'),
		'redirect' => '',
		'btn-bg' => '#F4334A',
		'convertloop_tags' => '',
		'convertloop_event' => 'Subscription'
	];

  $at = shortcode_atts( $attributes , $atts );

  ob_start();
?>

<div 
	class="contact-form"
	data-props='{
		"cl": {
			"tags": "<?php echo $at['convertloop_tags'] ?>",
			"event": "<?php echo $at['convertloop_event'] ?>"
		},
		"country": "<?php echo getCountry() ?>",
		"texts": {
			"button": "<?php echo $at['button-text'] ?>",
			"select_country": "<?php echo gett('Select country') ?>"
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
		"redirect": "<?php echo $at['redirect'] ? $at['redirect'] : get_option('subscribe_redirect') ?>",
		"btnBg": "<?php echo $at['btn-bg'] ?>"
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
        "heading" => "redirect page",
        "param_name" => "redirect",
        "value" => ''
			],
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
        "type" => "colorpicker",
        "heading" => "button color",
        "param_name" => "btn-bg",
        "value" => '#F4334A'
			],
		[
			"type" => "textfield",
      "heading" => "convertloop event name",
      "param_name" => "convertloop_event",
      "value" => 'Subscription'
		],
		[
			"type" => "textfield",
      "heading" => "convertloop tags",
      "param_name" => "convertloop_tags",
      "value" => 'Subscription',
			"description" => "fomart: tag1,tag2"
		]
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


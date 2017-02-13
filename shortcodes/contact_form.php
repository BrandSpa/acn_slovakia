<?php

function bs_contact_form_sc($atts, $content = null) {
	$attributes = [
		'name-placeholder' => 'Name',
		'lastname-placeholder' => 'Lastname',
		'email-placeholder' => 'Email',
		'country-placeholder' => 'Select country',
		'name-validation' => 'Name required',
		'lastname-validation' => 'lastName required',
		'email-validation' => 'Email required',
	];

  $at = shortcode_atts( $attributes , $atts );

  ob_start();
?>

<div 
	class="contact-form" 
	data-props='{
		"country": "Germany",
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
		}
	}'
>
</div>

<?php

  return ob_get_clean();
}

add_shortcode( 'bs_contact_form', 'bs_contact_form_sc' );
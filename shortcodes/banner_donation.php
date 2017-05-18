<?php

add_shortcode( 'bs_banner_donation', 'bs_banner_donation_sc' );

function bs_banner_donation_sc($atts, $content = null) {
	$attributes = [
		'banner' => '',
		"country" => getCountry(),
		"other" => gett("Other"),
		"monthly" => gett("Monthly"),
		"once" => gett("Once"),
		"donate" => gett("Donate"),
		"next" => gett("Next"),
		 "back" => gett("Back"),
		 "placeholder_amount" => gett("Amount"),
    "placeholder_credit_card" => gett("Credit Card Number"),
    "placeholder_month" => gett("MM"),
    "placeholder_year" => gett("YY"),
    "placeholder_cvc" => gett("CVC"),
    "placeholder_name" => gett("Name"),
    "placeholder_email" => gett("Email"),
    "placeholder_country" => gett("Country"),
		"validation_declined" => gett("Your transaction was not accepted, try again"),
    "validation_card" => gett("Incorrect card"),
    "validation_month" => gett("Incorrect month"),
    "validation_year" => gett("Incorrect year"),
    "validation_cvc" => gett("Incorrect cvc"),
    "validation_name" => gett("Incorrect name"),
    "validation_email" => gett("Incorrect email"),
    "validation_country" => gett("Incorrect country"),
		"template_uri" => str_replace("http:", "", get_template_directory_uri())
  ];

  $at = shortcode_atts( $attributes , $atts );

  ob_start();
?>

<?php if(show_donate()): ?>
<div 
	class="bs-donate-react" 
	data-props='{
    "texts": <?php echo json_encode($at) ?>, 
    "redirect": {
      "monthly": "<?php echo get_option('donate_monthly_redirect') ?>",
      "once": "<?php echo get_option('donate_once_redirect') ?>"
    }
  }'
>
</div>
<?php else: ?>
	<?php echo $at['banner'] ?>
<?php endif; ?>
<?php

  return ob_get_clean();
}

add_action( 'vc_before_init', 'bs_banner_donation_vc' );

  function bs_banner_donation_vc() {
		$params = [
			[
        "type" => "textarea",
        "heading" => "Banner",
        "param_name" => "banner",
        "value" => ''
			]
		];

		$atts = [
      "other" => "Other",
      "monthly" => "Monthly",
      "once" => "Once",
      "placeholder_amount" => "Amount",
      "placeholder_credit_card" => "Credit Card Number",
      "placeholder_month" => "MM",
      "placeholder_year" => "YY",
      "placeholder_cvc" => "CVC",
      "placeholder_name" => "Name",
      "placeholder_email" => "Email",
      "placeholder_country" => "Country",
      "validation_declined" => "Your transaction was not accepted, try again",
      "validation_card" => "Incorrect card",
      "validation_month" => "Incorrect month",
      "validation_year" => "Incorrect year",
      "validation_cvc" => "Incorrect cvc",
      "validation_name" => "Incorrect name",
      "validation_email" => "Incorrect email",
      "validation_country" => "Incorrect country"
    ];
    
    foreach($atts as $key => $val) {
      array_push($params, [
         "type" => "textfield",
         "heading" =>  str_replace('_', ' ', $key),
         "param_name" => $key,
         "value" => $val

      ]);
    }

  	vc_map(
      array(
        "name" =>  "BS banner & donation",
        "base" => "bs_banner_donation",
        "category" =>  "BS",
        "params" => $params
      ) 
    );
  }

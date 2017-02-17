<?php

function bs_donate_react_sc($atts, $content = null) {
	 $at = shortcode_atts([
		 "country" => getCountry(),
		 "other" => "Other",
		 "monthly" => "Monthly",
		 "once" => "Once",
		 "donate" => "Donate",
		 "next" => "Next",
		 "back" => "Back",
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
    "validation_country" => "Incorrect country",
		"template_uri" => str_replace("http:", "", get_template_directory_uri())
	 ], $atts);

	ob_start();
?>

<div 
	class="bs-donate-react" 
	data-props='{"texts": <?php echo json_encode($at) ?>}'
>
</div>

<?php
return ob_get_clean();
}

add_shortcode('bs_donate_react', 'bs_donate_react_sc');

add_action( 'vc_before_init', 'bs_donate_react_vc' );

  function bs_donate_react_vc() {
		$params = [];
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
      "validation_country" => "Incorrect country",
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
        "name" =>  "BS Donate",
        "base" => "bs_donate_react",
        "category" =>  "BS",
        "params" => $params
      ) 
    );
  }


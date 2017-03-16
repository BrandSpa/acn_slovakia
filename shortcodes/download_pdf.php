<?php

function bs_download_pdf_sc($atts, $content = null) {

  $pdfs = [
    "en" => "http://acninternational.org/wp-content/uploads/2017/03/via_crucis_final_ENGLISH.pdf",
    "es" => "http://acninternational.org/wp-content/uploads/2017/03/via_crucis_final_SPANISH.pdf",
    "fr" => "http://acninternational.org/wp-content/uploads/2017/03/via_crucis_final_FRENCH.pdf",
    "de" => "http://acninternational.org/wp-content/uploads/2017/03/via_crucis_final_GERMAN.pdf"
 ];

	$attributes = [
    'btn_text' => 'download PDF',
		'btn_color' => '',
		'email' => 'Email',
		'validation_email' => 'Email required',
		'pdf_url' => $pdfs[get_lang()]
  ];

  $at = shortcode_atts( $attributes , $atts );


	$props = [
		'btn' => [
			'text' => $at['btn_text'],
			'background' => $at['btn_color'],
		],
		'texts' => [
			'email' => $at['email'],
			'validation_email' => $at['validation_email'],
		],
		'country' => getCountry(),
		'pdf_url' => $at['pdf_url']
	];
	
  ob_start();
?>

<div
	class="bs-download-pdf" 
	data-props='<?php echo json_encode($props) ?>'
>
</div>

<?php

  return ob_get_clean();
}

add_shortcode( 'bs_download_pdf', 'bs_download_pdf_sc' );
add_action( 'vc_before_init', 'bs_download_pdf_vc' );

  function bs_download_pdf_vc() {
		$params = [
      [
        "type" => "textfield",
        "heading" => "btn Text",
        "param_name" => "btn_text",
        "value" => 'download PDF'
			],
			[
        "type" => "textfield",
        "heading" => "btn color",
        "param_name" => "btn_color",
        "value" => ''
			],
			[
        "type" => "textfield",
        "heading" => "Email placeholder",
        "param_name" => "email",
        "value" => 'Email'
			],
			[
        "type" => "textfield",
        "heading" => "Email validation",
        "param_name" => "validation_email",
        "value" => 'Email required'
			],
			[
        "type" => "textfield",
        "heading" => "PDF url",
        "param_name" => "pdf_url",
        "value" => $pdfs[get_lang()]
			]
		];

  	vc_map(
      array(
        "name" =>  "BS form download pdf",
        "base" => "bs_download_pdf",
        "category" =>  "BS",
        "params" => $params
      ) 
    );
  }


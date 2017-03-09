<?php

function bs_download_pdf_sc($atts, $content = null) {
	$attributes = [
    'btn_text' => 'download PDF',
		'btn_color' => '',
		'email' => 'Email',
		'pdf_url' => ''
  ];

  $at = shortcode_atts( $attributes , $atts );
	$props = [
		'btn' => [
			'text' => $at['btn_text'],
			'background' => $at['btn_color'],
		],
		'texts' => [
			'email' => $at['email']
		],
		'country' => getCountry()
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
        "heading" => "PDF url",
        "param_name" => "pdf_url",
        "value" => ''
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


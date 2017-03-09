<?php

function bs_download_pdf_sc($atts, $content = null) {
	$attributes = [
    'btn_text' => '',
		'btn_color' => '',
		'email' => 'Email',
  ];

  $at = shortcode_atts( $attributes , $atts );
	$props = [
		'btn' => [
			'text' => $at['btn_text'],
			'background' => $at['btn_color'],
		],
		'country' => getCountry()
	];
	
  ob_start();
?>

<div
	class="bs-download_pdf" 
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
        "type" => "textarea_html",
        "heading" => "Content",
        "param_name" => "content",
        "value" => ''
			],
      [
        "type" => "textfield",
        "heading" => "Title",
        "param_name" => "btn_title",
        "value" => ''
			]
		];

  	vc_map(
      array(
        "name" =>  "BS download_pdf",
        "base" => "bs_download_pdf",
        "category" =>  "BS",
        "params" => $params
      ) 
    );
  }


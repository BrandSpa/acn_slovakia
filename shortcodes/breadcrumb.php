<?php

function bs_breadcrumb_sc($atts, $content = null) {
	$attributes = [
		"style" => "margin-top: 20px; text-align: center; color: #b9b9b9"
	];

  $at = shortcode_atts( $attributes , $atts );
	
  ob_start();
?>

<div
	class="breadcrumbs" 
	style="<?php echo $at['style'] ?>" 
	typeof="BreadcrumbList" 
	vocab="https://schema.org/"
>
	<?php if(function_exists('bcn_display')) { bcn_display(); }?>
</div>

<?php
  return ob_get_clean();
}

add_shortcode( 'bs_breadcrumb', 'bs_breadcrumb_sc' );
add_action( 'vc_before_init', 'bs_breadcrumb_vc' );

  function bs_breadcrumb_vc() {
		$params = [
			[
        "type" => "textfield",
        "heading" => "Style",
        "param_name" => "style",
        "value" => "margin-top: 20px; text-align: center; color: #b9b9b9"
			]
		];

  	vc_map(
      array(
        "name" =>  "BS Breadcrumb",
        "base" => "bs_breadcrumb",
        "category" =>  "BS",
        "params" => $params
      ) 
    );
  }

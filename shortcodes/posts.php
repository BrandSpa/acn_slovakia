<?php

function bs_posts_sc($atts, $content = null) {
	$attributes = [
    'url' => '',

  ];

  $at = shortcode_atts( $attributes , $atts );
  
	$props = [
    'see_more' => gett('See more'),
    'url' => $at['url'],
    'read_more' => gett('Read more'),
    'see_more_link' => gett('https://acninternational.org/news/')
	];
	
  ob_start();
?>

<div
	class="bs-posts" 
	data-props='<?php echo json_encode($props) ?>'
>
</div>

<?php

  return ob_get_clean();
}

add_shortcode( 'bs_posts', 'bs_posts_sc' );
add_action( 'vc_before_init', 'bs_posts_vc' );

  function bs_posts_vc() {
		$params = [
      [
        "type" => "textfield",
        "heading" => "See More url",
        "param_name" => "url",
        "value" => ''
			]
		];

  	vc_map(
      array(
        "name" =>  "BS posts",
        "base" => "bs_posts",
        "category" =>  "BS",
        "params" => $params
      ) 
    );
  }


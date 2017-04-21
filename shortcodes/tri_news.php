<?php
/**
** 	
**/

add_shortcode( 'bs_tri_news', 'bs_tri_news_sc' );

function bs_tri_news_sc($atts, $content = null) {
	$attributes = [
		'id_1' => '',
		'id_2' => '',
    'id_3' => ''
  ];

  $at = shortcode_atts( $attributes , $atts );

  ob_start();
?>


<div class="bs-example">
<img src="<?php echo wp_get_attachment_url($at['image']) ?>" alt="">
<h1><?php echo $at['title'] ?></h1> 
<h3><?php echo $at['subtitle'] ?></h3>
<p><?php echo $content ?></p>
</div>

<script>
	onload(function() {
		//jquery stuff iría acá

	});
</script>
<?php

  return ob_get_clean();
}


add_action( 'vc_before_init', 'bs_tri_news_vc' );

  function bs_tri_news_vc() {
		$params = [
			[
        "type" => "textfield",
        "heading" => "Noticia 1",
        "param_name" => "id_1",
        "value" => ''
			],
      [
        "type" => "textfield",
        "heading" => "Noticia 2",
        "param_name" => "id_2",
        "value" => ''
			],
      [
        "type" => "textfield",
        "heading" => "Noticia 3",
        "param_name" => 'id_3',
        "value" => ""
      ]
		];

  	vc_map(
      array(
        "name" =>  "BS Tri_News",
        "base" => "bs_tri_news",
        "category" =>  "BS",
        "params" => $params
      ) 
    );
  }


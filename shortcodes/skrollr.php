<?php
/**
** 	
**/

add_shortcode( 'bs_skrollr', 'bs_skrollr_sc' );

function bs_skrollr_sc($atts, $content = null) {
	$attributes = [
		'titulo1' => '',
		'titulo2' => '',
        'titulo3' => ''
  ];

  $at = shortcode_atts( $attributes , $atts );

  ob_start();
?>


<div class="skrollr_container">
    <?php foreach($at as $key=>$titulo){ $key = ($key+1) * 200; var_dump($key); ?>
        <h1 data-0="transform:rotate(0deg);" data-<?php echo $key;?> ="transform:rotate(360deg);"><?php echo($titulo);?></h1><br />
    <?php } ?>

</div>

<script>
	onLoad(function() {
		//jquery stuff iría acá
	    var s = skrollr.init();
	});
</script>
<?php

  return ob_get_clean();
}


add_action( 'vc_before_init', 'bs_skrollr_vc' );

  function bs_skrollr_vc() {
		$params = [
			[
        "type" => "textfield",
        "heading" => "Title1",
        "param_name" => "titulo1",
        "value" => ''
			],
      [
        "type" => "textfield",
        "heading" => "Title2",
        "param_name" => "titulo2",
        "value" => ''
			],
			[
        "type" => "textfield",
        "heading" => "Title3",
        "param_name" => "titulo3",
        "value" => ''
      ]
		];

  	vc_map(
      array(
        "name" =>  "BS Skrollr",
        "base" => "bs_skrollr",
        "category" =>  "BS",
        "params" => $params
      ) 
    );
  }


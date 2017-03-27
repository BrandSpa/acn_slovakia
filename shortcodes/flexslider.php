<?php
/**
** 	
**/

add_shortcode( 'bs_example', 'bs_example_sc' );

function bs_example_sc($atts, $content = null) {
	$attributes = [
    'images' => ''
  ];

  $at = shortcode_atts( $attributes , $atts );

  ob_start();
?>

<!-- Place somewhere in the <body> of your page -->
<div class="flexslider">
  <ul class="slides">
		<?php foreach(explode(',', $at['images']) as $image): ?>
		 <li>
     	 <img src="<?php echo wp_get_attachment_url($image)  ?>" />
    </li>
		<?php
		endforeach;
		?>
  </ul>
</div>

<script>
	onLoad(function() {
		//jquery stuff iría acá
		 $('.flexslider').flexslider();
	});
</script>
<?php

  return ob_get_clean();
}


add_action( 'vc_before_init', 'bs_example_vc' );

  function bs_example_vc() {
		$params = [

			[
        "type" => "attach_images",
        "heading" => "Images",
        "param_name" => "images",
        "value" => ''
			],
 
		];

  	vc_map(
      array(
        "name" =>  "BS Example",
        "base" => "bs_example",
        "category" =>  "BS",
        "params" => $params
      ) 
    );
  }


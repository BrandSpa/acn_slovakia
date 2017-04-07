<?php
add_shortcode( 'bs_modal_gallery', 'bs_modal_gallery_sc' );

function bs_modal_gallery_sc($atts, $content = null) {
	$attributes = [
    'groupname' => '',
    'images' => ''
  ];

  $at = shortcode_atts( $attributes , $atts );

  ob_start();
?>

<!-- Place somewhere in the <body> of your page -->
<div class="flexslider">
  <ul class="slides">

		<?php foreach(explode(',', $at['images']) as $image):?>
        <?php $attachment = get_post( $image);?>
        <?php $get_description = get_post($image)->post_excerpt;?>
		 <li>
        <?php echo $get_description ?>
     	 <img src="<?php echo wp_get_attachment_url($image)  ?>" data-lightbox="<?php echo $at['groupname']  ?>" rel="prueba" alt="<?php echo get_post_meta($image, '_wp_attachment_image_alt', true);;  ?>" data-title="<?php echo $attachment['description']?>" />
    </li>
		<?php
		endforeach;
		?>
  </ul>
</div>

<script>
	onLoad(function() {
		//jquery stuff iría acá
		// $('.flexslider').flexslider();
	});
</script>
<?php

  return ob_get_clean();
}


add_action( 'vc_before_init', 'bs_modal_gallery_vc' );

  function bs_modal_gallery_vc() {
		$params = [
            [
        "type" => "textfield",
        "heading" => "Groupname",
        "param_name" => "groupname",
        "value" => ''
			],
			[
        "type" => "attach_images",
        "heading" => "Images",
        "param_name" => "images",
        "value" => ''
			],
 
		];

  	vc_map(
      array(
        "name" =>  "BS Modal_gallery",
        "base" => "bs_modal_gallery",// igual a add_shortcode( 'bs_flexslider', 'bs_example_sc' );
        "category" =>  "BS",
        "params" => $params
      ) 
    );
  }


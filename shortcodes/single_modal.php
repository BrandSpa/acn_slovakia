<?php
add_shortcode( 'bs_single_modal', 'bs_single_modal_sc' );

function bs_single_modal_sc($atts, $content = null) {
	$attributes = [
    'image' => ''
  ];

  $at = shortcode_atts( $attributes , $atts );

  ob_start();
?>

<?php 
 
?>

<!-- Place somewhere in the <body> of your page -->
<!--<link href="<?php //echo get_template_directory_uri() ?>/public/css/lightbox.css" rel="stylesheet">-->
<div class="single_modal" style="margin:20px 0;">
		<?php $image = $at['image'];//foreach(explode(',', $at['images']) as $image): ?>
        <?php $attachment_meta = wp_get_attachment($image); ?>
		 
      <a href="<?php echo wp_get_attachment_url($image) ?>" rel="lightbox['sameGroup']" title="<?php echo $attachment_meta['description']; ?>">
        <img style="max-width:100%;" src="<?php echo wp_get_attachment_url($image) ?>" alt="<?php echo $attachment_meta['alt']; ?>" />
        <!--<div class="modal_text" style="position:absolute; top:15px; padding:20px; color:#FFF;"><h5>+ Photo Gallery</h5></div>-->
      </a>
</div>

<script>
	onLoad(function() {
		//jquery stuff iría acá
		// $('.flexslider').flexslider();
	});
</script>
<!--<script src="<?php //echo get_template_directory_uri() ?>/public/js/lightbox.js"></script>-->
<?php

  return ob_get_clean();
}


add_action( 'vc_before_init', 'bs_single_modal_vc' );

  function bs_single_modal_vc() {
		$params = [
			[
        "type" => "attach_image",
        "heading" => "Image",
        "param_name" => "image",
        "value" => ''
			],
 
		];

  	vc_map(
      array(
        "name" =>  "BS single_modal",
        "base" => "bs_single_modal",// igual a add_shortcode( 'bs_flexslider', 'bs_example_sc' );
        "category" =>  "BS",
        "params" => $params
      ) 
    );
  }


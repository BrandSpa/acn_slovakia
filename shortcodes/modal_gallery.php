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

<?php 
  function wp_get_attachment( $attachment_id ) {

    $attachment = get_post( $attachment_id );
    return array(
    'alt' => get_post_meta( $attachment->ID, '_wp_attachment_image_alt', true ),
    'caption' => $attachment->post_excerpt,
    'description' => $attachment->post_content,
    'href' => get_permalink( $attachment->ID ),
    'src' => $attachment->guid,
    'title' => $attachment->post_title
);
}
?>

<!-- Place somewhere in the <body> of your page -->
<!--<link href="<?php //echo get_template_directory_uri() ?>/public/css/lightbox.css" rel="stylesheet">-->
<div class="modal_gallery" style="margin:20px 0;">
    <?php $countmodal=0;?>
		<?php foreach(explode(',', $at['images']) as $image): ?>
        <?php $attachment_meta = wp_get_attachment($image); ?>
		 
      <!--<a href="<?php echo wp_get_attachment_url($image) ?>" data-lightbox="<?php// echo $at['groupname'] ?>" data-title="<?php //$attachment_meta['description']; ?>">
        <img src="<?php echo wp_get_attachment_url($image) ?>" alt="<?php //$attachment_meta['alt']; ?>" />
      </a>-->

      <a href="<?php echo wp_get_attachment_url($image) ?>" rel="lightbox[<?php echo $at['groupname'] ?>]" title="<?php echo $attachment_meta['description']; ?>">
      <?php if($countmodal==0)
      {?>
        <img style="max-width:100%;" src="<?php echo wp_get_attachment_url($image) ?>" alt="<?php echo $attachment_meta['alt']; ?>" />
        <div class="modal_text" style="position:absolute; top:10px; padding:20px; color:#FFF;"><h5>+ Photo Gallery</h5></div>
      <?php }else{?>
        <img style="display:none;" src="<?php echo wp_get_attachment_url($image) ?>" alt="<?php echo $attachment_meta['alt']; ?>" />
      <?php }?>
      </a>
		<?php
    $countmodal++;
		endforeach;
		?>
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


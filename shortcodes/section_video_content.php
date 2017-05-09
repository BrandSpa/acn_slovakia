<?php

function bs_section_video_content_sc($atts, $content = null) {
	$attributes = [
		'image' => '',
		'video_url' => '',
		'image_width' => '100%',
		'image_height' => 'auto',
		'image_margin' => '0 auto'
	];

  $at = shortcode_atts( $attributes , $atts );
	$imgUrl = wp_get_attachment_image_src($at['image'], 'full')[0];

  ob_start();
?>

<div 
	class="section-video" 
	data-props='{
		"url": "<?php echo $at['video_url'] ?>", 
		"imgUrl": "<?php echo $imgUrl ?>",
		"imageStyle": {
			"width": "<?php echo $at['image_width'] ?>",
			"height": "<?php echo $at['image_height'] ?>",
			"margin": "<?php echo $at['image_margin'] ?>"
		},
		"content": "<?php echo json_encode($content) ?>"
	}'
>
</div>

<?php

  return ob_get_clean();
}

	add_shortcode( 'bs_section_video_content', 'bs_section_video_content_sc' );
	add_action( 'vc_before_init', 'bs_section_video_content_vc' );

  function bs_section_video_content_vc() {
		$params = [
			[
        "type" => "attach_image",
        "heading" => "Image",
        "param_name" => "image",
        "value" => ''
			],
			[
        "type" => "textfield",
        "heading" => "Video url",
        "param_name" => "video_url",
        "value" => ''
			],
			[
        "type" => "textfield",
        "heading" => "Image width",
        "param_name" => "image_width",
        "value" => '100%'
			],
			[
        "type" => "textfield",
        "heading" => "Image height",
        "param_name" => "image_height",
        "value" => 'auto'
			],
			[
        "type" => "textfield",
        "heading" => "Image margin",
        "param_name" => "image_margin",
        "value" => '0 auto'
			],
			[
				"type" => "textarea_html",
				"heading" => "content",
				"param_name" => "content"
			]
		];

  	vc_map(
      array(
        "name" =>  "BS Section video with content",
        "base" => "bs_section_video_content",
        "category" =>  "BS",
        "params" => $params
      ) 
    );
  }


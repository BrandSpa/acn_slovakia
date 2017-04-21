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
<?php foreach($at as $ID_n):  ?>
<?php $recent =  get_post($ID_n); //?>
<div class="" style="width:100%;">
	<div class="bs-post__recent">
		<?php if(get_post_meta($recent->ID, 'image_square_key', true)): ?>
		<a href="<?php echo get_permalink($recent->ID) ?>">
			<img src="<?php echo get_post_meta($recent->ID, 'image_square_key', true) ?>" style="width: 100%" />
			</a>
		<?php endif; ?>

		<div class="bs-post__recent__content">
			<h4>
				<a href="<?php echo get_permalink($recent->ID) ?>">
				<?php if(is_mobile()) : ?>
					<?php echo substr($recent->post_title, 0, 70) ?>...
				<?php else: ?>
					<?php echo $recent->post_title ?>
				<?php endif; ?>
				</a>
			</h4>
			<p><?php echo substr(wp_strip_all_tags($recent->post_content), 0, 80) ?>...</p>
			<a href="<?php echo get_permalink($recent->ID) ?>"><?php echo gett('Read more') ?>...</a>
		</div>
	</div>
 </div>
 <?php endforeach; ?>


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
        "heading" => "ID Noticia 1",
        "param_name" => "id_1",
        "value" => ''
			],
      [
        "type" => "textfield",
        "heading" => "ID Noticia 2",
        "param_name" => "id_2",
        "value" => ''
			],
      [
        "type" => "textfield",
        "heading" => "ID Noticia 3",
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


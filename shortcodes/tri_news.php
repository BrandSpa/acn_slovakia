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
<div class="l-wrap">
	<div class="bs-post__recent">
		<?php if(get_post_meta($at['id_1'], 'image_square_key', true)): ?>
		<a href="<?php echo get_permalink($at['id_1']) ?>">
			<img src="<?php echo get_post_meta($at['id_1'], 'image_square_key', true) ?>" style="width: 100%" />
			</a>
		<?php endif; ?>

		<div class="bs-post__recent__content">
			<h4>
				<a href="<?php echo get_permalink($at['id_1']) ?>">
				<?php if(is_mobile()) : ?>
					<?php echo substr($at['id_1']->post_title, 0, 70) ?>...
				<?php else: ?>
					<?php echo $at['id_1']->post_title ?>
				<?php endif; ?>
				</a>
			</h4>
			<p><?php echo substr(wp_strip_all_tags($at['id_1']->post_content), 0, 80) ?>...</p>
			<a href="<?php echo get_permalink($at['id_1']) ?>"><?php echo gett('Read more') ?>...</a>
		</div>
	</div>
 </div>
<div class="l-wrap" style="text-align:center">
 <a href="<?php echo gett('https://acninternational.org/news/') ?>" class='btn bs-see-more' > <?php echo gett('See more') ?> </a>
 </div>
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


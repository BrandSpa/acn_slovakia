<?php

function bs_posts_list_sc($atts, $content = null) {
	$attributes = [
		'read_more' => 'Read more',
		'latest_news' => 'Latest news',
		'all_the_latest' => 'All the latest'
  ];

	$page = $_GET['posts'] || 0;
	$offset = $_GET['posts'] ? intval($_GET['posts']) * 7 : 0;

  $at = shortcode_atts( $attributes , $atts );
	$args = array( 'posts_per_page' => 7, 'offset' => $offset );

  $recent_posts = get_posts( $args );
  ob_start();
?>

<?php $counter = 0; ?>

<div class="bs-posts-list">
	<h3><?php echo $at['latest_news']; ?></h3>
<?php  foreach($recent_posts as $post): ?>
	<?php $counter++; ?>
	
		<?php if($counter == 1): ?>
			<div class="bs-post-list__main">
				<div class="bs-post-list__main__img" style="background-image: <?php echo wp_get_attachment_url( get_post_thumbnail_id($post->ID) ); ?>;background-color: #E5A612;">
					
				</div>

				<div class="bs-post-list__main__content" style="background-color: #3C515F;">
					<h2><?php echo $post->post_title ?></h2>
					<p><?php echo substr(wp_strip_all_tags($post->post_content), 0, 150) ?>...</p>
					<a href="<?php echo get_permalink($post->ID) ?>"><?php echo $at['read_more'] ?></a>
				</div>
			</div>

				<h3>	<?php echo  $at['all_the_latest']; ?> </h3>
		<?php else: ?>

	
			<div class="bs-post-list__item">
				<div class="bs-post-list__item__img" style="background: #E5A612;">
					<?php echo wp_get_attachment_url( get_post_thumbnail_id($post->ID) ); ?>
				</div>
				<div class="bs-post-list__item__content" style="background: #fff">
					<h2><?php echo $post->post_title ?></h2>
					<p><?php echo substr(wp_strip_all_tags($post->post_content), 0, 150) ?>...</p>
					<a href="<?php echo get_permalink($post->ID) ?>"><?php echo $at['read_more'] ?></a>
				</div>
		</div>

	<?php endif; ?>

<?php endforeach; ?>
<div class="bs-post-list__pagination">
	<button><i class="ion-chevron-left"></i> prev</button>
	<button>next <i class="ion-chevron-right"></i></button>
</div>
</div>
<script>
	var page = '<?php echo $page ?>';
	window.location = window.location.origin + '' + window.location.pathname + '?posts=' + page; 
</script>
<?php

  return ob_get_clean();
}

add_shortcode( 'bs_posts_list', 'bs_posts_list_sc' );
add_action( 'vc_before_init', 'bs_posts_list_vc' );

  function bs_posts_list_vc() {
		$params = [
      [
        "type" => "textfield",
        "heading" => "Read More",
        "param_name" => "read_more",
        "value" => ''
			],
			[
				"type" => "textfield",
        "heading" => "Latest News",
        "param_name" => "latest_news",
        "value" => ''
			],
			[
				"type" => "textfield",
        "heading" => "All the Latest",
        "param_name" => "all_the_latest",
        "value" => ''
			]
		];

  	vc_map(
      array(
        "name" =>  "BS posts list",
        "base" => "bs_posts_list",
        "category" =>  "BS",
        "params" => $params
      ) 
    );
  }


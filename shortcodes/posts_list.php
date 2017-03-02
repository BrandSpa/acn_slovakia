<?php

function bs_posts_list_sc($atts, $content = null) {
	$attributes = [
		'read_more' => 'Read More',
		'latest_news' => 'Latest news',
		'all_the_latest' => 'All the latest',
		'next' => 'next',
		'prev' => 'prev'
  ];
	
	$pages = 0;

	if(function_exists('pll_count_posts') && function_exists('pll_current_language')){
		 $pages = ceil(pll_count_posts(pll_current_language()) / 10);
	}

	$page = isset($_GET['posts']) ?  $_GET['posts'] : 0;
	$offset = isset($_GET['posts']) ? intval($_GET['posts']) * 10 : 0;

  $at = shortcode_atts( $attributes , $atts );
	$args = array( 'posts_per_page' => 10, 'offset' => $offset );

  $recent_posts = get_posts( $args );
  ob_start();
?>

<?php $counter = 0; ?>

<div class="bs-posts-list">
	<h3><?php echo gett('Latest news'); ?></h3>
<?php  foreach($recent_posts as $post): ?>
	<?php $counter++; ?>
	
		<?php if($counter == 1): ?>
			<div class="bs-posts-list__main">
			<?php if(!empty(get_post_meta($post->ID, 'image_square_key', true))): ?>
				<a href="<?php echo get_permalink($post->ID) ?>">
					<div 
						class="bs-posts-list__main__img" 
						style="background-image:url(<?php echo get_post_meta($post->ID, 'image_square_key', true, true) ?>);background-color: #E5A612;">					
					</div>
				</a>
				<?php endif; ?>
				<div class="bs-posts-list__main__content" style="background-color: #3C515F;">
					<h2><a href="<?php echo get_permalink($post->ID) ?>"><?php echo $post->post_title ?></a></h2>
					<p><?php echo substr(wp_strip_all_tags($post->post_content), 0, 150) ?>...</p>
					<a href="<?php echo get_permalink($post->ID) ?>"><?php echo gett('Read more') ?> <i class="ion-chevron-down"></i> </a>
				</div>
			</div>

			<h3>	<?php echo  gett('All the latest'); ?> </h3>
		<?php else: ?>
	
			<div class="bs-posts-list__item">
				<?php if(!empty(get_post_meta($post->ID, 'image_square_key', true))): ?>
					<a href="<?php echo get_permalink($post->ID) ?>">
					<div
						class="bs-posts-list__item__img" 
						style="background-image: url(<?php echo get_post_meta($post->ID, 'image_square_key', true) ?>);">
					</div>
					</a>
						<?php $itemStyle = ''; ?>
				<?php else: ?>
					<?php $itemStyle = 'bs-posts-list__item__content--without'; ?>
				<?php endif; ?>

				<div class="bs-posts-list__item__content <?php echo $itemStyle; ?>">
					<h2><a href="<?php echo get_permalink($post->ID) ?>"><?php echo substr($post->post_title, 0, 70) ?>...</a></h2>
					<p><?php echo substr(wp_strip_all_tags($post->post_content), 0, 120) ?>...</p>
					<a class="bs-posts-list__item__readmore" href="<?php echo get_permalink($post->ID) ?>"><?php echo gett('Read more') ?>...</a>
				</div>
		</div>

	<?php endif; ?>

<?php endforeach; ?>
	<div class="bs-posts-list__pagination">

		<button class="bs-posts-list__pagination__prev">
			<i class="ion-chevron-left"></i> <?php echo gett('prev') ?>
		</button>
		<div class="bs-posts-list__pagination__nums"></div>
		<button class="bs-posts-list__pagination__next">
			<?php echo gett('next') ?> <i class="ion-chevron-right"></i>
		</button>
	</div>
</div>

<script>
function redirectPage(type) {
	var page = parseInt('<?php echo $page ?>');
	var pages = parseInt('<?php echo $pages ?>');
	var nums = [];

	if(type == 'next') page = page + 1;
	if(type == 'prev') page = page > 0 ? page - 1 : 0;
	window.location = window.location.origin + '' + window.location.pathname + '?posts=' + page; 
};

	document.querySelector('.bs-posts-list__pagination__prev').addEventListener('click', function() {
		redirectPage('prev');
	});

	document.querySelector('.bs-posts-list__pagination__next').addEventListener('click', function() {
		redirectPage('next');
	});
	
	console.log(pages);
	
	for(i = 0; i < pages; i++) {
		console.log(i);
	}

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
        "value" => 'Read more'
			],
			[
				"type" => "textfield",
        "heading" => "Latest News",
        "param_name" => "latest_news",
        "value" => 'Latest news'
			],
			[
				"type" => "textfield",
        "heading" => "All the Latest",
        "param_name" => "all_the_latest",
        "value" => 'All the latest'
			],
				[
				"type" => "textfield",
        "heading" => "Prev",
        "param_name" => "prev",
        "value" => 'prev'
			],

				[
				"type" => "textfield",
        "heading" => "Prev",
        "param_name" => "next",
        "value" => 'next'
			],

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


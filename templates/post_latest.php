<?php
	$args = array( 'posts_per_page' => 4, 'exclude' => $post->ID );
  $recent_posts = get_posts( $args );
?>

<?php foreach($recent_posts as $recent): ?>
<div class="bs-post__recent">
	<h4><?php echo $recent->post_title ?></h4>
	<p><?php echo substr(wp_strip_all_tags($recent->post_content), 0, 150) ?>...</p>
</div>
<?php endforeach; ?>


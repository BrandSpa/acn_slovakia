<?php

function bs_get_posts($type = 'post', $paged = 1, $category = '') {
	$query = new Wp_Query(array(
    'post_type' => $type,
    'paged' => $paged,
    'category' => $category
  ));
	
	$posts = array_map(function($post) {
		$post->post_image = get_the_post_thumbnail_url($post->ID, 'full');
		$post->post_short = wp_strip_all_tags(substr($post->post_content, 0, 200));
		$post->post_permalink = get_post_permalink($post->ID);
		return $post;
	}, $query->get_posts());
	
	return $posts;
}


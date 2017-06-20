<?php

function bs_get_posts($type = array('video','gallery','featured','post'), $paged = 1, $category = '', $perpage = '6') {
	$query = new Wp_Query(array(
    'post_type' => $type,
    'paged' => $paged,
    'category_name' => $category,
		'posts_per_page' => $perpage,
		'post_status' => 'publish'
  ));

	$posts = array_map(function($post) {
		$thumbId = get_post_thumbnail_id($post->ID);
		$post->post_image = get_post_meta($post->ID, 'image_square_key') ? str_replace('http:', '', get_post_meta($post->ID, 'image_square_key')) : '';
		$post->post_short = preg_replace('/\[(.*?)\]/', '', wp_strip_all_tags(substr($post->post_content, 0, 200)) );
		$post->post_permalink = get_post_permalink($post->ID);
		return $post;
	}, $query->get_posts());
	
	return $posts;
}


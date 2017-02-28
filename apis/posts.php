<?php

function bs_get_posts($type = 'post', $paged = 1, $category = '') {
	$query = new Wp_Query(array(
    'post_type' => $type,
    'paged' => $paged,
    'category' => $category
  ));
	
	$posts = array_map(function($post) {
		$thumbId = get_post_thumbnail_id($post->ID);
		$post->post_image = str_replace('http:', '', wp_get_attachment_url($thumbId));
		$post->post_short = preg_replace('/\[(.*?)\]/', '', wp_strip_all_tags(substr($post->post_content, 0, 200)) );
		$post->post_permalink = get_post_permalink($post->ID);
		return $post;
	}, $query->get_posts());
	
	return $posts;
}


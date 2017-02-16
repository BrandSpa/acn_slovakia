<?php
function addImageToPost($post) {
	$post['image'] = get_the_post_thumbnail_url($post->ID, 'full');
	return $post;
}

function bs_get_posts($type = 'post', $paged = 1, $category = '') {
	$query = new Wp_Query(array(
    'post_type' => $type,
    'paged' => $paged,
    'category' => $category
  ));
	
	$posts = array_map('addImageToPost', $query->get_posts());
	
	return $posts;
}


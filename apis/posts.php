<?php

function bs_get_posts($type = 'post', $paged = 1, $category = '') {
	$query = new Wp_Query(array(
    'post_type' => $type,
    'paged' => $paged,
    'category' => $category
  ));

	return $query->get_posts();
}


<?php
include_once str_replace('metaboxes', '', __DIR__) . '/lib/update_field.php';

function geolify() {
	header('Location:'. $url);
}

function bs_geolify_metabox() {
	$post_id = $_GET['post'] ? $_GET['post'] : $_POST['post_ID'];

	add_meta_box('geolify', 'BS Geolify', 'bs_geolify_cb', 'page', 'normal', 'high', null);
}

add_action('add_meta_boxes', 'bs_geolify_metabox');

function bs_geolify_cb($post) {
  wp_nonce_field('bs_geolify_meta', 'bs_geolify_nonce');
	$countries = get_post_meta($post->ID, 'countries_key');

	$urls = get_post_meta($post->ID, 'urls_key');
	$props = [
		"countries" => $countries,
		"urls" => $urls
	];
?>
	<div class="bs-geolify" data-props='<?php echo json_encode($props) ?>'></div>
	<script src="<?php echo get_template_directory_uri() ?>/public/js/admin.js"></script>
<?php
}


function bs_geolify_save($post_id) {
  update_field(array(
    'field_key' => 'countries_key',
    'field_name' => 'countries',
    'post_id' => $post_id
  ));

	update_field(array(
    'field_key' => 'urls_key',
    'field_name' => 'urls',
    'post_id' => $post_id
  ));
}

add_action( 'save_post', 'bs_geolify_save');
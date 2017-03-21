<?php
include_once str_replace('metaboxes', '', __DIR__) . '/lib/update_field.php';


function bs_type_gallery_metabox() {
	$post_id = null;
	if(isset($_GET['post'])) $post_id =  $_GET['post'] ? $_GET['post'] : null; 
	if(isset($_POST['post_ID']) && $post_id == null) $post_id = $_POST['post_ID'] ? $_POST['post_ID']: null;

	add_meta_box('geolify', 'BS gallery', 'bs_type_gallery_cb', 'gallery', 'normal', 'high', null);
}

add_action('add_meta_boxes', 'bs_type_gallery_metabox');

function bs_type_gallery_cb($post) {
  wp_nonce_field('bs_type_gallery_meta', 'bs_type_gallery_nonce');
	$countries = get_post_meta($post->ID, 'type_gallery_images_key', true);
	$urls = get_post_meta($post->ID, 'type_gallery_excerpts_key', true);
	$props = [];
?>

	<div 
		class="bs-gallery" 
		data-props='<?php echo json_encode(cleanQuote($props)) ?>'>
	</div>

	<script src="<?php echo get_template_directory_uri() ?>/public/js/admin.js"></script>
<?php
}


function bs_type_gallery_save($post_id) {
  update_field(array(
    'field_key' => 'type_gallery_images_key',
    'field_name' => 'images',
    'post_id' => $post_id
  ));

	update_field(array(
    'field_key' => 'type_gallery_excerpt_key',
    'field_name' => 'excerpt',
    'post_id' => $post_id
  ));
}

add_action( 'save_post', 'bs_type_gallery_save');
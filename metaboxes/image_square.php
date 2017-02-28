<?php
  include_once str_replace('metaboxes', '', __DIR__) . '/lib/update_field.php';

  function bs_page_image_square_metabox() {

    $post_id = $_GET['post'] ? $_GET['post'] : $_POST['post_ID'] ;

    add_meta_box('page_image_square', 'Square Image', 'bs_page_image_square_cb', 'page', 'normal', 'high', null);
  }

  add_action('add_meta_boxes', 'bs_page_image_square_metabox');

  function bs_page_image_square_cb($post) {
    wp_nonce_field('bs_page_mr_meta', 'bs_multiregional_nonce'); 
    $value = get_post_meta($post->ID, 'image_square_key', true);
?>

<div>
	<p>
		<input type="text" class="upload-img" name="image_square" placeholder="Image Square" value="<?php echo $value ?>" />
	</p>

</div>
<?php 
	} //end bs_page_image_square_cb


function bs_save_image_square_meta($post_id) {

    update_field(array(
      'field_key' => 'image_square_key',
      'field_name' => 'image_square',
      'post_id' => $post_id
    ));
}

  add_action( 'save_post', 'bs_save_image_square_meta(');
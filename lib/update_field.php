<?php

function clean_empty($val) {
  if(!empty($val)) return true;
}

function update_field($args) {
  $field_content = '';

  if ( defined('DOING_AUTOSAVE') && DOING_AUTOSAVE ) {
    return;
  }

  if( isset( $_POST[$args['field_name']] ) && !empty( $_POST[$args['field_name']] ) ) {
    $field_content = $_POST[ $args['field_name'] ];
  }


  if(is_array($field_content)) {
    $field_content = array_filter($field_content, 'clean_empty');
  }

  update_post_meta($args['post_id'], $args['field_key'] , $field_content);
}

 ?>

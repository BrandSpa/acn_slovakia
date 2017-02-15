<?php

function bs_header_slider_sc($atts, $content = null) {
	$attributes = ['images' => ''];

  foreach([1,2,3,4] as $i) {
    $attributes =  array_merge($attributes, ['title_' .$i => '' ]);
    $attributes =  array_merge($attributes, ['subtitle_' .$i => '' ]);
    $attributes =  array_merge($attributes, ['url_' .$i => '' ]);
    $attributes =  array_merge($attributes, ['isvideo_' .$i => false ]);
  }

  $at = shortcode_atts( $attributes , $atts );
  $slides = [];
  
  foreach([1,2,3,4] as $i) {
    $images = explode($i, $at['images']);
    if(isset($images[$i])) {
      array_push($slides, [
        'title' => $at['title_' .$i],
        'subtitle' => $at['subtitle_' .$i],
        'url' => $at['url_' .$i],
        'imgUrl' => wp_get_attachment_url($images[$i]),
        'isVideo' => $at['isvideo_'. $i]
      ]);
    }
 
  }

  ob_start();
?>

<div
  class="header-slider" 
  data-props='{"slides": <?php echo json_encode($slides) ?>}'
></div>

<?php

  return ob_get_clean();
}

  add_shortcode( 'bs_header_slider', 'bs_header_slider_sc' );

  function bs_header_slider_vc() {
    $params = [
                array(
            "type" => "attach_images",
            "param_name" => "images"
          ),

          array(
            "type" => "textfield",
            "heading" => "Slider height",
            "param_name" => "height",
            "value" => '100px'
          ),

           array(
            "type" => "textfield",
            "heading" => "Slider interval",
            "param_name" => "interval",
            "value" => "3000"
          )
    ];

    foreach([1,2,3,4] as $i) {
      array_push($params, 
        [
          'type' => 'textfield',
          'param_name' => 'title_' .$i,
          'heading' => 'title ' .$i,
          'value' => ''
        ],
         [
          'type' => 'textfield',
          'param_name' => 'subtitle_' .$i,
          'heading' => 'subtitle ' .$i,
          'value' => ''
        ],
        [
          'type' => 'textfield',
          'param_name' => 'url_' .$i,
          'heading' => 'url ' .$i,
          'value' => ''
        ],
        [
          'type' => 'checkbox',
          'param_name' => 'isvideo_' .$i,
          'heading' => 'Is video ' .$i,
          'value' => false
        ]
      );
    }

    vc_map(
      array(
        "name" =>  "BS Header Slider",
        "base" => "bs_header_slider",
        "category" =>  "BS",
        "params" => $params
      ) 
    );
  }

  add_action( 'vc_before_init', 'bs_header_slider_vc' );
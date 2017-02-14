<!DOCTYPE html>
<html >
<head>
	<meta charset="UTF-8">
	 <meta name="viewport" content="width=device-width,initial-scale=1, maximum-scale=1, user-scalable=0">
	<title><?php echo wp_title(); ?></title>
		<!--wordpress files-->
	  <?php wp_head(); ?>
		<!-- /wordpress files-->
		<link rel="stylesheet" href="<?php echo get_template_directory_uri() ?>/public/css/index.css">
		<link rel="stylesheet" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
</head>
<body>

<div class="nav">
	  <a href="#" class="logo">
        <?php if( !empty( get_option("logo") ) ): ?>
          <img src='<?php echo str_replace('http:', '', get_option("logo")) ?>'  alt="acn logo" class="img-responsive" width="150"  />
        <?php endif; ?>
     </a>

	<ul class="menu">
	  <?php
			$args = array(
            'theme_location' => 'header',
            'container' => false,
            'echo' => false
			);

			$menu = wp_nav_menu( $args);
    	echo clean_menu($menu);
    ?>
	</ul>
</div>
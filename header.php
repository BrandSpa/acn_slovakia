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
</head>
<body>

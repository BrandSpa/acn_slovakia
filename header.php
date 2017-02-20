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
		  <script> 
    function onLoad(cb) {
      if (window.addEventListener)
        window.addEventListener("load", cb, false);
      else if (window.attachEvent) {
        window.attachEvent("onload", cb);
      } else {
        window.onload = cb;
      } 
    }
  </script>
</head>
<body>

<?php require('templates/nav.php') ?>
	<?php require('templates/footer.php') ?>

	<!--wordpress files-->
	  <?php wp_footer() ?>
	<!-- /wordpress files-->

<!--app theme-->
<script type="text/javascript" src="<?php echo get_template_directory_uri() ?>/public/js/app.js"></script>
<!--/app theme-->
 <!-- Google Analytics -->
  <script src='https://www.google-analytics.com/analytics.js'></script>

  <script>
  window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;

  ga('create', '<?php echo get_option('analytics_id') ?>', 'auto');
  ga('send', 'pageview');
   ga('require', 'ecommerce');
  </script>
<!-- End Google Analytics -->
</body>
</html>

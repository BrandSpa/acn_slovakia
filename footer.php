	<?php require('templates/footer.php') ?>

<?php var_dump(dirname(__FILE__)) ?>
	<!--wordpress files-->
	  <?php wp_footer() ?>
	<!-- /wordpress files-->

<script type="text/javascript" src="<?php echo get_template_directory_uri() ?>/public/js/app.js"></script>

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

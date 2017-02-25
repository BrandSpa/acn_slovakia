	<?php require('templates/footer.php') ?>

	<!--wordpress files-->
	  <?php wp_footer() ?>
	<!-- /wordpress files-->
<script type="text/javascript">
function downloadJSAtOnload() {
  var element = document.createElement("script");
  element.src = '<?php echo get_template_directory_uri() ?>/public/js/app.js';
  document.body.appendChild(element);
}

  if (window.addEventListener) {
    window.addEventListener("load", downloadJSAtOnload, false);
  } else if (window.attachEvent) {
    window.attachEvent("onload", downloadJSAtOnload);
  } else {
    window.onload = downloadJSAtOnload;
  }
</script>
<!--app theme-->

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

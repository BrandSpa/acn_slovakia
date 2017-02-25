	<?php require('templates/footer.php') ?>
<?php print_r($GLOBALS['wp_scripts']->registered['wpb_composer_front_js']['src'] ) ?>
	<!--wordpress files-->
	  <?php wp_footer() ?>
	<!-- /wordpress files-->

	<!--async load app-->
<script type="text/javascript">
  function downloadJS (){
    [
      '<?php echo get_template_directory_uri() ?>/public/js/app.js'
    ].forEach(function(src) {
      var element = document.createElement("script");
      element.src = src;
      document.body.appendChild(element);
    });
    
  }

  if (window.addEventListener) {
    window.addEventListener("load", downloadJS, false);
  } else if (window.attachEvent) {
    window.attachEvent("onload", downloadJS);
  } else {
    window.onload = downloadJS;
  }
</script>
	<!--/async load app-->

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

	<?php require('templates/footer.php') ?>
	<!--wordpress files-->
	  <?php wp_footer() ?>
	<!-- /wordpress files-->

	<!--async load app-->
<script type="text/javascript">
  function appendScript(src) {
    var element = document.createElement("script");
    element.src = src;
    document.body.appendChild(element);
  }

  function appendLink(href) {
    var element = document.createElement("link");
    element.rel = 'stylesheet';
    element.href = href;
    element.type = 'text/css';
    element.media = 'all';
    document.head.appendChild(element);
  }

  function downloadJS (){
    [
      '<?php echo get_template_directory_uri() ?>/public/js/app.js'
    ].forEach(function(src) {
      appendScript(src);
    });

    // [
    //   '<?php echo get_template_directory_uri() ?>/public/css/index.css',
    //   '//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css'
    // ].forEach(function(href) {
    //   appendLink(href);
    // });
    
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
<div class="hidden"><?php var_dump(get_user_location()) ?></div>
<div class="hidden"><?php var_dump(getCountryLang(getCountry())) ?></div>
<div><?php var_dump(pll_the_languages( array( 'raw' => 1 ) )); ?></div>
</body>
</html>

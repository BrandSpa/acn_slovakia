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
    []
    .forEach(function(src) {
      appendScript(src);
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
<script>
  var bs = {};
  bs.donate = '<?php echo gett('Donate') ?>'
</script>

<script src='<?php echo get_template_directory_uri() ?>/public/js/vendor.0f659d58acdfbf7f40d0.js'></script>
<script src='<?php echo get_template_directory_uri() ?>/public/js/app.8151972e3daa393a2016.js'></script>

<!--/app theme-->

 <!-- Google Analytics -->
  <script src='https://www.google-analytics.com/analytics.js'></script>

  <script>
  window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;

  ga('create', '<?php echo get_option('analytics_id') ?>', 'auto');
  ga('send', 'pageview');
  ga('require', 'ecommerce');  
  
  <?php if(isset($_GET['customer_id']) && isset($_GET['order_revenue'])): ?>
    ga('ecommerce:addTransaction', {
      id: "<?php echo $_GET['customer_id'] ?>",
      revenue: "<?php echo $_GET['order_revenue'] ?>",
			currency: 'USD',
    });
  <?php endif; ?>
</script>
<!-- End Google Analytics -->

</body>
</html>

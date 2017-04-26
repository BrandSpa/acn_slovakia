	<?php require('templates/footer.php') ?>
  <a 
    href="#"
    id="return-to-top" 
     style="display: none;color: #fff; text-align: center; padding-top: 10px; position: fixed; bottom: 40px; right: 40px; background: rgba(0, 0, 0, .5); width: 40px; height: 40px; border-radius: 40px"
  >
    <i class="ion-chevron-up"></i>
  </a>

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
  bs.lang = '<?php echo getCountryLang(getCountry()) ?>'
  bs.donate = '<?php echo gett('Donate') ?>'
</script>

<script src='<?php echo get_template_directory_uri() ?>/public/js/vendor.680d80d1dccf450c6105.js'></script>
<script src='<?php echo get_template_directory_uri() ?>/public/js/app.a6a69b26e1edae1ad0a5.js'></script>
<!--<script src="<?php echo get_template_directory_uri() ?>/public/js/lightbox.js"></script>-->

<!--/app theme-->

<script>/*////Provisional banner jul//////////////////////*/
	$(document).ready(function(){
    var $ban_ind=0;
    var $isMobile=false;
    const b_prefix="https://acninternational.org/";
    var $links=["es/oracion-por-visita-de-papa-francisco-a-egypto","prayer-campaign-for-pope-francis-trip-to-egypt"];
    var $mob_imgs=["wp-content/uploads/2017/04/BannerEsM.gif","wp-content/uploads/2017/04/BannerEnM.gif"];
    var $desk_imgs=["wp-content/uploads/2017/04/BannerEs.gif","wp-content/uploads/2017/04/BannerEn.gif"];
    var $b_anchor = $(".desk_banner");
    var $b_image = $(".desk_banner img");
    if($b_anchor.length>0){
      alert(window.innerWidth);
    }else{
        alert("No banner");
      }
    	
    });
</script>

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

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

<script src='<?php echo get_template_directory_uri() ?>/public/js/vendor.6189b91dd8968f41ac18.js'></script>
<script src='<?php echo get_template_directory_uri() ?>/public/js/app.5d276dd1ec5278375387.js'></script>

<!--/app theme-->

<script>/*////Provisional banner jul//////////////////////*/
	$(document).ready(function(){
    var $is_banner=$(".banner-horizontal");
    if($is_banner.length>0){
    var $ban_ind=0;
    const b_prefix="https://acninternational.org/";
    var $b_links=["es/oracion-por-visita-de-papa-francisco-a-egypto","prayer-campaign-for-pope-francis-trip-to-egypt"];
    var $mob_imgs=["wp-content/uploads/2017/04/BannerEsM.gif","wp-content/uploads/2017/04/BannerEnM.gif"];
    var $desk_imgs=["wp-content/uploads/2017/04/BannerEs.gif","wp-content/uploads/2017/04/BannerEn.gif"]; 
    var $bn_path=$(location).attr('pathname').split('/');
    var $bn_lang=$bn_path[1];
    if($bn_lang!="es"){var $ban_ind=1;}
        $(".mobi_banner").attr("href", b_prefix+$b_links[$ban_ind]);
        $(".mobi_banner").find("img").attr("src", b_prefix+$mob_imgs[$ban_ind]);
        $(".desk_banner").attr("href", b_prefix+$b_links[$ban_ind]);
        $(".desk_banner").find("img").attr("src", b_prefix+$desk_imgs[$ban_ind]);
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

    ga('ecommerce:send');
  <?php endif; ?>
  
</script>
<!-- End Google Analytics -->

</body>
</html>

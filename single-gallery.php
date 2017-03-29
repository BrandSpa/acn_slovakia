<?php
/**
 * Template Name: Gallery Header
 *
 * @package WordPress
 * @since acn_int 1.0
 */

?>

<?php get_header() ?>

<div id="acn_int" class="bs-post" >

<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
<?php
$images = get_post_meta($post->ID, 'type_gallery_images_key', true);
$excerpts = get_post_meta($post->ID, 'type_gallery_excerpts_key', true);
$props = [
	"images" => $images, 
	"excerpts" => $excerpts, 
	"texts" => [
		"gallery" => gett('Gallery'),
		"of" => gett('of')
	]
];
?>

<div class="bs-gallery-header" data-props='<?php echo cleanQuote(json_encode($props)) ?>'></div>

<script type="text/javascript">
onLoad(function() {
	function changeColor() {
		$('.nav img').css({filter: 'grayscale() invert()'});
		$('.nav img').css({'-ms-filter': 'grayscale() invert()'});
		$('.nav li > a').css('color', ' #fff');
		$('.nav').css({background: 'rgb(34, 34, 34)'});
	}
	
	changeColor();

	function changeColorNormal() {
		$('.nav').css('background-color', '#fff');
		$('.nav img').css('filter', 'none');
		$('.nav li > a').css('color', ' #3C515F');
	}
	
	  window.addEventListener('scroll', function() {
    if(document.querySelector('.bs-gallery-header').getBoundingClientRect().bottom < 0 ) {
			changeColorNormal();
    }

    if(document.querySelector('.bs-gallery-header').getBoundingClientRect().bottom > 0) {
      changeColor();
    }
		});
})
</script>

<div class="l-wrap">

	<div class="breadcrumbs" style="margin-top: 20px; text-align: center; color: #b9b9b9" typeof="BreadcrumbList" vocab="https://schema.org/">
    <?php if(function_exists('bcn_display'))
    {
        bcn_display();
    }?>
</div>

		<div class="bs-post__content col-8-l col-12-s" id="post-content">
			<?php the_content() ?>
		</div>
	</div>

	<?php require('templates/post_donate.php') ?>

	<div class="l-wrap" style="margin: 40px auto">
		<h3 style="font-size: 28px; font-weight: normal; display: block; margin: 40px 0;color: #3C515F"><?php echo gett('Latest news'); ?></h3>
		<?php require('templates/post_latest.php') ?>
	</div>

  <?php endwhile; else : ?>
    <h2> <?php echo gett('404') ?> </h2>
  <?php endif; ?>
</div>

<?php get_footer() ?>

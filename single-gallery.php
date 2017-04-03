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
	<div class="col-8-l">
	<span class="video__header__metadata" style="font-size: 1.1em; color: #4A4A4A; display: block; margin-top: 80px">
		<?php foreach(get_the_category($post->ID) as $ind => $category): ?>
			<span style="font-weight: 600">
				<?php echo $category->name ?> <?php echo $ind >= 0 && $ind + 1 != count(get_the_category($post->ID)) ?  '|' : '/' ?>
			</span>
		<?php endforeach; ?>
		<?php echo  get_the_date( 'm - Y', $post->ID ); ?>
	</span>
	<div class="breadcrumbs" style="margin: 3px 0 10px 0;  color: #b9b9b9" typeof="BreadcrumbList" vocab="https://schema.org/">
		<?php if(function_exists('bcn_display')) { bcn_display(); }?>
	</div>

	<h3 style="padding-bottom: 10px;color: #3C515F"><?php the_title() ?></h3>
	</div>
</div>

	<div class="l-wrap">
		<div class="col-1-l"></div>
		<div class="col-5-l col-12-s" style="word-wrap: break-word;">
			<?php the_content() ?>
			<div class="banner-horizontal">
				<?php echo get_option('banner_horizontal') ?>
			</div>
		</div>

		<div class="col-2-l"></div>
		
		<div class="col-3-l banner-vertical">
			<?php echo get_option('banner_vertical') ?>
		</div>

	</div>

	<?php require('templates/post_share.php') ?>
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

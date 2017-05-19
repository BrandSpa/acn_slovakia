<?php get_header() ?>

<div id="acn_int" class="bs-post" >

<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
		
<?php if(!empty(get_the_post_thumbnail_url($post->ID, 'full'))): ?>
	<?php require('templates/post_header_image.php') ?>
<?php else: ?>
	<?php require('templates/post_header.php') ?>
<?php endif; ?>

<!--<div class="l-wrap">
	<div class="breadcrumbs" style="margin-top: 20px; text-align: center; color: #b9b9b9" typeof="BreadcrumbList" vocab="https://schema.org/">
    <?php if(function_exists('bcn_display'))
    {
       // bcn_display();
    }?>
</div>-->
<!-- Nuevo Jul -->

<!-- Fin Nuevo-->

		<!--<div class="bs-post__content col-8-l col-12-s" id="post-content" style="margin-top:80px;">
			<?php //the_content() ?>
		</div>-->
		
		<!--Banners new --> 
		<div id="post-content" class="l-wrap" style="margin-top: 80px">
		<div class="col-1-l"></div>
		<div class="col-5-l col-12-s post-text" style="word-wrap: break-word;">
			<?php the_content() ?>

			<div class="banner-horizontal">
			<?php if(get_lang() == 'en'): ?>
				<a href="<?php echo get_option('banner_url_en') ?>">
					<?php echo get_option('banner_horizontal_en') ?>
				</a>
			<?php else: ?>
				<a href="<?php echo get_option('banner_url_es') ?>">
					<?php echo get_option('banner_horizontal_es') ?>
				</a>
			<?php endif; ?>
			</div>
		</div>

		<div class="col-2-l"></div>
		
		<div class="col-3-l banner-vertical">
			<?php if(get_lang() == 'en'): ?>
				<a href="<?php echo get_option('banner_url_en') ?>">
					<?php echo get_option('banner_vertical_en') ?>
				</a>
			<?php else: ?>
				<a href="<?php echo get_option('banner_url_es') ?>">
					<?php echo get_option('banner_vertical_es') ?>
				</a>
			<?php endif; ?>
		</div>

	</div>
		<!--fin banners new-->
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

<script>
	onLoad(function() {
		console.log(window.innerWidth < '767');
		if(window.innerWidth < '767') {
			jQuery('.post-text').addClass('post-text--trim');
			jQuery('.post-text').append('<div class="post-text__see_more"><button>see more</button>');

			jQuery(document).on('click', '.posts-text__see-more', function() {
				jQuery('.post-text').removeClass('post-text--trim');
				jQuery(this).remove();
			});
		}
		
	})
</script>

<style>
.post-text--trim {
	overflow: hidden;
	height: 500px;
	position: relative;
}

.posts-text__see-more {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	margin: 0 auto;
	width: 100%;
	background: -moz-linear-gradient(top, rgba(30,87,153,0) 0%, rgba(255,255,255,1) 100%); /* FF3.6-15 */
	background: -webkit-linear-gradient(top, rgba(30,87,153,0) 0%,rgba(255,255,255,1) 100%); /* Chrome10-25,Safari5.1-6 */
	background: linear-gradient(to bottom, rgba(30,87,153,0) 0%,rgba(255,255,255,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#001e5799', endColorstr='#ffffff',GradientType=0 ); /* IE6-9 */
}
</style>


<?php get_footer() ?>

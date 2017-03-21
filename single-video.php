<?php get_header() ?>

<div id="acn_int" class="bs-post--video" >
<!--video template-->
<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

<?php if(get_post_meta($post->ID, 'video_url_key', true)): ?>
	<iframe class="video__header" src="<?php echo get_post_meta($post->ID, 'video_url_key', true) ?>?modestbranding=1&autohide=1&showinfo=0&controls=0" width="100%" frameborder="0"></iframe>
	<div class="video__header-title" style="background: #b9b9b9; text-align: center">
		<h3 style="padding-bottom: 20px; border-bottom: 1px solid #D3D3D3"><?php the_title() ?></h3>
	</div>

	<script>
	onLoad(function() {
		var h = window.innerHeight;
		$('.video__header').height(h);
		var titleH = $('.video__header-title').height();
		console.log(titleH);
		$('.video__header-title').css({position: 'relative', top: '-' + titleH + 'px'});
	})
	</script>
<?php endif; ?>

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

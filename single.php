<?php get_header() ?>

<div id="acn_int" class="bs-post l-wrap" >
  <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
		<?php require('templates/post_header_image.php') ?>
	<?php if(get_the_post_thumbnail_url($post->ID, 'full')): ?>
<?php else: ?>
	<div class="bs-post__header col-12-l">
		<div class="bs-post__header__title col-10-l col-12-s">
			<h2><?php the_title() ?></h2>
		</div>
	</div>
<?php endif; ?>

	<div class="bs-post__content col-8-l col-12-s">
	 	<?php the_content() ?>
	</div>
   
  <?php endwhile; else : ?>
    <h2> <?php echo gett('404') ?> </h2>
  <?php endif; ?>
</div>

<?php get_footer() ?>

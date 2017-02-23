<?php get_header() ?>

<div id="acn_int" class="bs-post" >
  <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
	<?php if(get_the_post_thumbnail_url($post->ID, 'full')): ?>
<?php else: ?>
	<div class="bs-post__header col-12-l">
		<div class="bs-post__header__title col-10-l col-12-s">
			<h2><?php the_title() ?></h2>
		</div>
	</div>
<?php endif; ?>

	<div class="bs-post__content">
	 	<?php the_content() ?>
	</div>
   
    
  <?php endwhile; else : ?>
    <h1>
    <?php echo gett('404') ?>
    </h1>
  <?php endif; ?>
</div>

<?php get_footer() ?>

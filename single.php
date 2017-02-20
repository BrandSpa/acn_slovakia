<?php get_header() ?>

<div id="acn_int" class="l-wrap bs-post" >
  <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
	<div class="bs-post__header" style="backgroun-image: url(<?php the_post_thumbnail_url() ?>)">
		<div class="bs-post__title">
			<h1><?php the_title() ?></h1>
		</div>
	</div>
		
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

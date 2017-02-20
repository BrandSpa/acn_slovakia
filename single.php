<?php get_header() ?>

<div id="acn_int" class="bs-post" >
  <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
	<?php
	var_dump(get_the_post_thumbnail_url($post->ID, 'full'));

	if(get_the_post_thumbnail_url('full')) {
		$style = "background-image: url(<?php the_post_thumbnail_url() ?>); backgroun-size: cover"; 
	} else {
		$style = "background: #F4F4F4";
	}

	?>
	<div class="bs-post__header" style="<?php echo $style ?>">
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

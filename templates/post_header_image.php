<div class="bs-post__header--image" style="background-image: url(<?php echo get_the_post_thumbnail_url($post->ID, 'full') ?>)">
	<div class="bs-post__header--image__title">
		<h3 style="padding-bottom: 20px; border-bottom: 1px solid #D3D3D3"><?php the_title() ?></h3>
				<a style="display: block; margin: 0 auto; width: 20px" href="#post-content">
	
		</a>
	</div>
</div>

	<div class="bs-post__header--image__title--mobile">
		<h3><?php the_title() ?></h3>
		<a style="display: block; margin: 0 auto; width: 20px" href="#post-content">
				<?php require('down_arrow.php') ?>
		</a>
	</div>

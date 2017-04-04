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
<div class="bs-post__header--image" style="background-image: url(<?php echo get_the_post_thumbnail_url($post->ID, 'full') ?>); background-attachment: fixed">
    <div class="bs-feat__img__textbox" style="">
        <div class="news_date" style="color:#FFF;">
        <span class="featured__metadata" style="font-weight:600; font-size:18px; color:#eaeaea line-height:1.28; text-align:left;">
				<?php foreach(get_the_category($post->ID) as $ind => $category): ?>
					<span style="">
						<?php echo $category->name ?> <?php echo $ind >= 0 && $ind + 1 != count(get_the_category($post->ID)) ?  '|' : '' ?>
					</span>
				<?php endforeach; ?>
				<?php echo '/ ' . get_the_date( 'M Y', $post->ID ); ?>
			</span>
        </div>
        <div class="breadcrumbs" style=" color: #e1e1e1; text-align:left; font-size:15px; margin:0;" typeof="BreadcrumbList" vocab="https://schema.org/">
        <?php if(function_exists('bcn_display'))
        {
         bcn_display();
        }?>
        </div>
        <h3 style="color:#FFF; font-size:40px; line-height:1.05; margin:40px 0;"><?php the_title(); ?></h3>
    </div> 
    <a class="bs-down-btn" href="#post-content">
			<?php require(__DIR__. '/templates/down_arrow.php')?>
	</a>
</div>
<!-- Fin Nuevo-->

		<div class="bs-post__content col-8-l col-12-s" id="post-content">
			<?php the_content() ?>
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

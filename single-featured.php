<?php get_header() ?>

<div id="acn_int" class="bs-post" >

<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
		
<?php if(!empty(get_the_post_thumbnail_url($post->ID, 'full'))): ?>
	<?php require('templates/post_header_image.php') ?>
<?php else: ?>
	<?php require('templates/post_header.php') ?>
<?php endif; ?>

<div class="l-wrap">
	<div class="breadcrumbs" style="margin-top: 20px; text-align: center; color: #b9b9b9" typeof="BreadcrumbList" vocab="https://schema.org/">
    <?php if(function_exists('bcn_display'))
    {
        bcn_display();
    }?>
    !!!
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

<script>
    onLoad(function() {
        $('.bs-post__header--image').css('height', '100vh');
        function changeColor() {
            $('body').css('padding', 0);
            $('.nav').css('transition', 'all 300ms');
            $('.nav').css('background-color', 'transparent');
            $('.nav li > a').css('color', '#FFF');
            $('.nav img').css('filter', 'grayscale() invert()');
        }
       changeColor();

        window.addEventListener('scroll', function() {
            
            if(document.querySelector('.bs-post__header--image').getBoundingClientRect().bottom < 0 ) {
                $('.nav').css('background-color', '#fff');
                $('.nav img').css('filter', 'none');
                $('.nav li > a').css('color', ' #3C515F');
            }

             if(document.querySelector('.bs-post__header--image').getBoundingClientRect().bottom > 0) {
                changeColor();
            }
		});
    });

</script>

<?php get_footer() ?>

<div class="bs-footer">
	<div class="bs-footer__left col-3-l">
		<img width="86" height="86" src="//acninternational.org/wp-content/uploads/2017/02/pope.png" class="vc_single_image-img attachment-medium" alt="pope">
			<?php echo gett('“I invite you all, together with ACN, to do everywhere in the world, a work of mercy.”'); ?>
	</div>
	<div class="bs-footer__right col-9-l">
		<div class="bs-footer__right--top">
			<ul class="bs-footer__menu">
				<?php
					$args = array(
						'theme_location' => 'footer',
						'container' => false,
						'echo' => false
					);

					$menu = wp_nav_menu( $args);
					echo clean_menu($menu);
				?>
			</ul>
		</div>
		<div class="bs-footer__right--bottom">


		</div>
	</div>
	<div class="bs-footer__bottom--top">
	
	</div>
	<div class="bs-footer__bottom--bottom">

	</div>
</div>

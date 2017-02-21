<div class="bs-footer">
	<div class="bs-footer__left col-3-l">
		<img width="86" height="86" src="//acninternational.org/wp-content/uploads/2017/02/pope.png" class="vc_single_image-img attachment-medium" alt="pope">
			<p><?php echo gett('“I invite you all, together with ACN, to do everywhere in the world, a work of mercy.”'); ?></p>
			<img width="122" height="23" src="//acninternational.org/wp-content/uploads/2017/02/SignPope.png" class="vc_single_image-img attachment-thumbnail" alt="signpope">
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
		<div>
			<h5>Contact</h5>
			<h6>ACN International</h6>
			<h6>Aid to the Church in Need gGmbH</h6>
			<h6>Westerbachstraße 23</h6>
			<h6>61476 Kronberg</h6>
			<h6>Ph.: +49-6174-291-0</h6>
		</div>
		<div>
			<?php echo do_shortcode('[bs_contact_info]') ?>
		</div>
		<div>
			<h6><a href="#">PRIVACY POLICY</a></h6>
			<h6><a href="#">TERMS & CONDITIONS</a></h6>
			<h6><a href="#">KPMG</a></h6>
		</div>

		</div>
	</div>
	<div class="bs-footer__bottom--top">
	
	</div>
	<div class="bs-footer__bottom--bottom">

	</div>
</div>

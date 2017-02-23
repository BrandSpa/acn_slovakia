<div class="nav">
	  <a href="<?php echo bs_home_url(); ?>" class="logo">
        <?php if( !empty( get_option("logo") ) ): ?>
					
          <img src='<?php echo str_replace('http:', '',  get_option("logo_". getCountry()) ) ?>'  alt="acn logo" class="img-responsive" width="150"  />
        <?php endif; ?>
     </a>

		<a href="#" class="open-menu">
			<svg width="33px" height="18px" viewBox="40 55 33 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
					<!-- Generator: Sketch 42 (36781) - http://www.bohemiancoding.com/sketch -->
					<desc>Created with Sketch.</desc>
					<defs></defs>
					<g id="Group-18" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(41.000000, 56.000000)" stroke-linecap="round" stroke-linejoin="round">
							<path d="M0.371283232,0.75 L30.0739418,0.75" id="Line" stroke="#F1364E" stroke-width="1.5"></path>
							<path d="M0.371283232,7.75 L30.0739418,7.75" id="Line-Copy-3" stroke="#F1364E" stroke-width="1.5"></path>
							<path d="M0.371283232,14.75 L30.0739418,14.75" id="Line-Copy-4" stroke="#F1364E" stroke-width="1.5"></path>
					</g>
			</svg>
		</a>
	<ul class="menu">
	  <?php
			$args = array(
        'theme_location' => 'header',
        'container' => false,
        'echo' => false
		);

			$menu = wp_nav_menu( $args);
    	echo clean_menu($menu);
    ?>
	</ul>

		<ul class="menu--mobile">
	  <?php
			$args = array(
        'theme_location' => 'header',
        'container' => false,
        'echo' => false
		);

			$menu = wp_nav_menu( $args);
    	echo clean_menu($menu);
    ?>
	</ul>

</div>
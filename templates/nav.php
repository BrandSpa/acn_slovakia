<div class="nav">
	  <a href="#" class="logo">
        <?php if( !empty( get_option("logo") ) ): ?>
          <img src='<?php echo str_replace('http:', '', get_option("logo")) ?>'  alt="acn logo" class="img-responsive" width="150"  />
        <?php endif; ?>
     </a>
		 <button class="">menu</button>
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

	<?php var_dump(wp_get_nav_menu_items('header')) ?>
</div>
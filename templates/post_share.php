<?php $current_url = esc_url($_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']); ?>
<div class="bs-post__share" style="background: #F7F7F7">
	<div class="l-wrap">
		<ul>
			<li style="display: inline-block">
      	<a key={1} style={shareBtn} href="https://www.facebook.com/sharer/sharer.php?u=<?php echo $current_url ?>">
        	<i class="ion-social-facebook"></i></a>
      </li>
			<li style="display: inline-block">
				<a key={2} style={shareBtn} href="https://twitter.com/intent/tweet?text=<?php echo $current_url ?>">
					<i class="ion-social-twitter"></i></a>
			</li>
			<li style="display: inline-block">
				<a key={3} style={shareBtn} href="https://www.linkedin.com/shareArticle?mini=true&url=<?php echo $current_url ?>">
					<i class="ion-social-linkedin"></i></a>
			</li>
			<li style={{...liStyle, display: 'none', '@media(max-width: 767px)': {display: 'inline-block'} }}>
				<a key={4} style={shareBtn} href="whatsapp://send?text=<?php echo $current_url ?>">
					<i class="ion-social-whatsapp-outline"></i>
				</a>
			</li>
		</ul>
	</div>
</div>
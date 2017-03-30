<?php $current_url = esc_url($_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']); ?>
<div class="bs-post__share" style="background: #F7F7F7">
	<div class="l-wrap">
		<ul>
			<li style="display: inline-block">
      	<a key={1} style="	color: #939597;
			width: 40px;
			height: 40px;
			border-radius: 40px;
			text-align: center;
			display: block;
			border: 1px solid #939597;
			padding: 5px;
      font-size: 20px;" href="https://www.facebook.com/sharer/sharer.php?u=<?php echo $current_url ?>">
        	<i class="ion-social-facebook"></i></a>
      </li>
			<li style="display: inline-block">
				<a key={2} style="	color: #939597;
			width: 40px;
			height: 40px;
			border-radius: 40px;
			text-align: center;
			display: block;
			border: 1px solid #939597;
			padding: 5px;
      font-size: 20px;" href="https://twitter.com/intent/tweet?text=<?php echo $current_url ?>">
					<i class="ion-social-twitter"></i></a>
			</li>
			<li style="display: inline-block">
				<a key={3} style="	color: #939597;
			width: 40px;
			height: 40px;
			border-radius: 40px;
			text-align: center;
			display: block;
			border: 1px solid #939597;
			padding: 5px;
      font-size: 20px;" href="https://www.linkedin.com/shareArticle?mini=true&url=<?php echo $current_url ?>">
					<i class="ion-social-linkedin"></i></a>
			</li>
			<li style="display: inline-block">
				<a key={4} style="	color: #939597;
			width: 40px;
			height: 40px;
			border-radius: 40px;
			text-align: center;
			display: block;
			border: 1px solid #939597;
			padding: 5px;
      font-size: 20px;" href="whatsapp://send?text=<?php echo $current_url ?>">
					<i class="ion-social-whatsapp-outline"></i>
				</a>
			</li>
		</ul>
	</div>
</div>
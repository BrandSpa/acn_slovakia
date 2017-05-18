<?php
add_shortcode( 'bs_candle', 'bs_candle_sc' );

function bs_candle_sc($atts, $content = null) {
	$attributes = [];

  $at = shortcode_atts( $attributes , $atts );

  ob_start();
?>

<style>

.candle {
	animation: show 2s ease-in infinite;
}

@keyframes show {
  0%{transform: skewX(0deg) skewY(0deg) scale(1); opacity: .5}

  50% {
    transform: skewX(0deg) skewY(0deg) scale(.9); opacity: 1
  }
  
  100%{transform: skewX(0deg) skewY(0deg) scale(1); opacity: .5}
}


@-moz-keyframes air{
  0%{-moz-transform: skewX(0deg) skewY(0deg) scale(1,1);}
  31%{-moz-transform: skewX(0deg) skewY(0deg) scale(1,1);}
  32%{-moz-transform: skewX(0deg) skewY(0deg) scale(-1.2,1.5);}
  33%{-moz-transform: skewX(5deg) skewY(5deg) scale(1,0.9);}
  34%{-moz-transform: skewX(-1deg) skewY(-1deg) scale(1,1);}
  36%{-moz-transform: skewX(0deg) skewY(0deg);}
  98%{-moz-transform: skewX(0deg) skewY(0deg);}
  99%{-moz-transform: skewX(2deg) skewY(2deg);}
  100%{-moz-transform: skewX(0deg) skewY(0deg) scale(0.9,1.4);}
}
@-webkit-keyframes air{
  0%{-webkit-transform: skewX(0deg) skewY(0deg) scale(1,1);}
  31%{-webkit-transform: skewX(0deg) skewY(0deg) scale(1,1);}
  32%{-webkit-transform: skewX(0deg) skewY(0deg) scale(-1.2,1.5);}
  33%{-webkit-transform: skewX(5deg) skewY(5deg) scale(1,0.9);}
  34%{-webkit-transform: skewX(-1deg) skewY(-1deg) scale(1,1);}
  36%{-webkit-transform: skewX(0deg) skewY(0deg);}
  98%{-webkit-transform: skewX(0deg) skewY(0deg);}
  99%{-webkit-transform: skewX(2deg) skewY(2deg);}
  100%{-webkit-transform: skewX(0deg) skewY(0deg) scale(0.9,1.4);}
}
@keyframes air{
  0%{transform: skewX(0deg) skewY(0deg) scale(1,1);}
  31%{transform: skewX(0deg) skewY(0deg) scale(1,1);}
  32%{transform: skewX(0deg) skewY(0deg) scale(-1.2,1.5);}
  33%{transform: skewX(5deg) skewY(5deg) scale(1,0.9);}
  34%{transform: skewX(-1deg) skewY(-1deg) scale(1,1);}
  36%{transform: skewX(0deg) skewY(0deg);}
  98%{transform: skewX(0deg) skewY(0deg);}
  99%{transform: skewX(2deg) skewY(2deg);}
  100%{transform: skewX(0deg) skewY(0deg) scale(0.9,1.4);}
}

</style>

<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 20.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#3C515F;}
	.st1{fill:#E4A945;}
	.st2{fill:#FCC752;}
	.st3{fill:#FFFFFF;}
	.st4{fill:#E5E5E5;}
</style>
<g>
	<g>
		<circle class="st0" cx="256" cy="256" r="239.5"/>
		<g class="candle">
			<path class="st1" d="M288,110.2c8.4,14.5,6,32.8-5.9,44.7l0,0c-14.4,14.4-37.9,14.4-52.3,0l0,0c-11.8-11.8-14.2-30.2-5.9-44.7
				L256,55L288,110.2z"/>
			<path class="st2" d="M282.1,154.9c-14.4,14.4-37.9,14.4-52.3,0c-6.6-6.6-10.3-15.2-10.8-24.1c14.5,10.8,35,9.6,48.2-3.5l0,0
				c9.9-9.9,13.2-24.3,9.1-37.2l11.6,20.1C296.4,124.7,294,143.1,282.1,154.9z"/>
		</g>
		<g>
			<path class="st3" d="M326.7,188.2v285.2c0,2.5-2.4,3.4-5.9,4.6c0,0-18.9,11.5-61.3,12.2c-42.4,0.7-68.4-12.2-68.4-12.2
				c-3.6-1.4-5.9-2.1-5.9-4.6V188.2c0-2.5,2.6-4.6,5.9-4.6h58.9V179c0-2.5,2.6-4.6,5.9-4.6c3.3,0,5.9,2.1,5.9,4.6v4.6h58.9
				C324.1,183.6,326.7,185.6,326.7,188.2z"/>
			<path class="st4" d="M267.8,184.1v38.8c0,5.4-5.3,9.7-11.8,9.7c-6.5,0-11.8-4.3-11.8-9.7v48.4c0,5.4-5.3,9.7-11.8,9.7
				s-11.8-4.3-11.8-9.7v-87.2h23.6C244.2,184.1,267.8,184.1,267.8,184.1z"/>
		</g>
	</g>
</g>
</svg>
<script>
	onload(function() {
		//jquery stuff

	});
</script>
<?php

  return ob_get_clean();
}

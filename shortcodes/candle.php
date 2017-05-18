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

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve"><g><path d="M69.02,26c-0.095,2-8.616,3.576-19.076,3.576c-9.754,0-17.839-1.428-18.943-3.233V94h0.072c0.064,3,8.55,4.238,19.01,4.238   c10.461,0,18.898-1.574,18.963-3.729L69.02,26z"/><path class="candle" d="M59.113,17.599c0-5.388-11.415-16.458-11.415-16.458S43.25,12.211,43.25,17.599c0,4.704,2.563,6.988,6.069,7.493   c-1.591-0.433-2.81-2.183-2.81-5.714c0-4.128,1.823-13.319,1.823-13.319s5.936,9.191,5.936,13.319c0,3.564-1.268,5.31-2.268,5.721   v-4.959C52,19.909,50.535,20,50.202,20h-0.173C49.695,20,50,19.909,50,20.139v6.217C50,26.586,49.695,26,50.029,26h0.173   C50.535,26,52,26.586,52,26.356V25.2C55,25.184,59.113,22.968,59.113,17.599z"/></g></svg>

<script>
	onload(function() {
		//jquery stuff

	});
</script>
<?php

  return ob_get_clean();
}

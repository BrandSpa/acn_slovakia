<?php
$dir_base =  str_replace('lib', '', __DIR__);
if( file_exists($dir_base . '/vendor/autoload.php') ) {

  require $dir_base . 'vendor/autoload.php';


	function getCacheImg($filename = '') {
		$imagecache = new ImageCache();
		$imagecache->cached_image_directory = $dir_base . '/public/img/cached';
		$cached_src_one = $imagecache->cache( $dir_base . '/public/img/visa.png' );
	}

}
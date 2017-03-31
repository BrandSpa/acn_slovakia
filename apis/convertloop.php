<?php
$dir_base =  str_replace('apis', '', __DIR__);
require $dir_base . 'vendor/autoload.php';

function createPerson() {
	$convertloop = new \ConvertLoop\ConvertLoop("746fffe4", "NFZRSq3xfbmHudRAUYtLkBCv", "v1");	
	$convertloop->people()->createOrUpdate(array(
  	"email" => "german.escobar@convertloop.co",
  	"add_tags" => array("Tag 1", "Tag 2")
	));
}


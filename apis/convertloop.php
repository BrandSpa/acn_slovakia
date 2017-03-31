<?php
$dir_base =  str_replace('apis', '', __DIR__);


/**
** Documentation
** url: https://convertloop.co/docs/developers/getting-started
**/
if( file_exists($dir_base . '/vendor/autoload.php') ) {

require $dir_base . '/vendor/autoload.php';

function cl_createPerson($appId, $apiKey, $data) {
	$cl = new \ConvertLoop\ConvertLoop($appId, $apiKey, "v1");	
	$person = array(
    "email" => $data['email'],
    "first_name" => $data['name'],
    "last_name" => $data['lastname'],
	);

	$cl->people()->createOrUpdate($person);	
}

function cl_createPersonWithTags($appId, $apiKey, $data) {
	$cl = new \ConvertLoop\ConvertLoop($appId, $apiKey, "v1");	
	$res = $cl->people()->createOrUpdate(array(
  	"email" => $data['email'],
  	"add_tags" => $data['tags'] //is an array
	));
	return $res;
}

function cl_createEvent($appId, $apiKey, $data) {
	$cl = new \ConvertLoop\ConvertLoop($appId, $apiKey, "v1");
	$cl->eventLogs()->send(array(
		"name" => $data['event'], 
		"email" => $data['email']
	));
}
} else {
	return 'no autoload';
}
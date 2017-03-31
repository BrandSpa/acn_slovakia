<?php
$dir_base =  str_replace('apis', '', __DIR__);
require $dir_base . 'vendor/autoload.php';
/**
** Documentation
** url: https://convertloop.co/docs/developers/getting-started
**/


function createPerson($appId, $apiKey, $data) {
	$cl = new \ConvertLoop\ConvertLoop($appId, $apiKey, "v1");	
	$person = array(
    "email" => $data['email'],
    "first_name" => $data['name'],
    "last_name" => $data['lastname'],
	);

	$cl->people()->createOrUpdate($person);	
}

function createPersonWithTags($appId, $apiKey, $data) {
	$cl = new \ConvertLoop\ConvertLoop($appId, $apiKey, "v1");	
	$cl->people()->createOrUpdate(array(
  	"email" => $data['email'],
  	"add_tags" => $data['tags'] //is an array
	));
}

function createEvent($appId, $apiKey, $data) {
	$cl = new \ConvertLoop\ConvertLoop($appId, $apiKey, "v1");
	$cl->eventLogs()->send(array(
		"name" => $data['event'], 
		"email" => $data['email']
	));
}

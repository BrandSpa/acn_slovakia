<?php
$dir_base =  str_replace('apis', '', __DIR__);

/**
** Documentation
** url: https://convertloop.co/docs/developers/getting-started
**/

require $dir_base . 'vendor/autoload.php';

	function cl_createPerson($appId, $apiKey, $data) {
		try {
		$cl = new \ConvertLoop\ConvertLoop($appId, $apiKey, "v1");	
		$person = array(
			"email" => $data['email'],
			"first_name" => $data['name'],
			"last_name" => $data['lastname'],
		);

		$cl->people()->createOrUpdate($person);	
		} catch(Exception $e) {
			return $e;
		}
	}

	function cl_create_person($appId, $apiKey, $data) {
		try {
			$data = json_encode($data);
			$auth_string = $appId . ":" . $apiKey;
      $auth = base64_encode($auth_string);

			$headers = array(
				"Authorization" => "Basic " . $auth,
				'Accept' => 'application/json', 'content-type' => 'application/json'
			);

			$endpoint = 'https://api.convertloop.co/v1/people';

			$req = Requests::post($endpoint, $headers, $data);

			return $res;
		} catch(Exception $e) {
			return $e;
		}
		
	}

	function cl_createEvent($appId, $apiKey, $data) {
		$cl = new \ConvertLoop\ConvertLoop($appId, $apiKey, "v1");
		$cl->eventLogs()->send(array(
			"name" => $data['event'], 
			"email" => $data['email']
		));
	}


?>
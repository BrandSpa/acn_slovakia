<?php
$dir_base =  str_replace('apis', '', __DIR__);

/**
** Documentation
** url: https://convertloop.co/docs/developers/getting-started
**/

require $dir_base . 'vendor/autoload.php';

	// $data: { "email": "german.escobar@convertloop.co", "add_tags": ["Tag 1", "Tag2"] }
	function cl_create_person($appId, $apiKey, $data) {
		try {
			$data = json_encode($data);
			$auth_string = $appId . ":" . $apiKey;
      $auth = base64_encode($auth_string);

			$headers = array(
				"Authorization" => "Basic " . $auth,
				'Accept' => 'application/json', 
				'content-type' => 'application/json'
			);

			$endpoint = 'https://api.convertloop.co/v1/people';

			$req = Requests::post($endpoint, $headers, $data);
			return $req->body;
		} catch(Exception $e) {
			return ['error' => $e];
		}
		
	}

	// $data: { "name": "Signed Up", "person": { "email": "german.escobar@convertloop.co" } }
	function cl_create_event($appId, $apiKey, $data) {
			try {
			$data = json_encode($data);
			$auth_string = $appId . ":" . $apiKey;
      $auth = base64_encode($auth_string);

			$headers = array(
				"Authorization" => "Basic " . $auth,
				'Accept' => 'application/json', 
				'content-type' => 'application/json'
			);

			$endpoint = 'https://api.convertloop.co/v1/event_logs';

			$req = Requests::post($endpoint . '', $headers, $data);
			return $req->body;
		} catch(Exception $e) {
			return ['error' => $e];
		}
	}


?>
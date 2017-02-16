<?php
use PHPUnit\Framework\TestCase;
use \Mockery as m;

require str_replace('tests/apis', '', __DIR__) .'/apis/stripe.php';

class StripeTest extends TestCase 
{
	protected $apiKey = 'sk_test_vq5s51SGycQ6dvCqC3H7JcCl';
	protected $token = '';

	public function testStripeCreateToken() 
	{
		 $card = [
			'number' => '4242424242424242',
			'exp_month' => '02',
			'exp_year' => '2020',
			'cvc' => '123'
		 ];

		$request = stripe_create_token($this->apiKey, $card);
		$response = json_decode(json_encode($request));
		//set token for further tets
		$this->token = $response->id;
		$this->assertObjectHasAttribute('id', 	$response );
		$this->assertEquals(false, 	$response->livemode );
	}

	public function testStripeCreateCustomer() {
		$customer = [
			'email' => 'test@brandspa.com',
			'stripe_token' => $this->token
		];

		var_dump($customer);
		$request = stripe_create_customer($this->apiKey, $customer);
		$response = json_decode(json_encode($request));
		
		$this->assertObjectHasAttribute('id', 	$response );

	}
}



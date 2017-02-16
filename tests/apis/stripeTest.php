<?php
use PHPUnit\Framework\TestCase;
use \Mockery as m;

require str_replace('tests/apis', '', __DIR__) .'/apis/stripe.php';

class StripeTest extends TestCase 
{
	public function testStripeCreateToken() 
	{
		 $card = [
			'number' => '4242424242424242',
			'exp_month' => '02',
			'exp_year' => '2020',
			'cvc' => '123'
		 ];

		$request = stripe_create_token('sk_test_vq5s51SGycQ6dvCqC3H7JcCl', $card);
		$response = json_decode(json_encode($request));
		var_dump($response);
		$this->assertObjectHasAttribute('id', 	$response );
		$this->assertEquals(false, 	$response->livemode );
	}
}



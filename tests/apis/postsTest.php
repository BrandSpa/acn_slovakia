<?php
use PHPUnit\Framework\TestCase;
require str_replace('tests/apis', '', __DIR__) .'/apis/posts.php';

class PostsTest extends TestCase 
{
	protected $apiKey = 'sk_test_vq5s51SGycQ6dvCqC3H7JcCl';
	protected $token = '';

	public function testGetPosts() 
	{
		$request = get_posts('post');
		$this->assertObjectHasAttribute('id', 	$response );
		$this->assertEquals(false, 	$response->livemode );
	}
}



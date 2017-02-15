<?php
use PHPUnit\Framework\TestCase;
require str_replace('tests/shortcodes', '', __DIR__) .'/shortcodes/header_slider.php';

class HeaderSliderTest extends TestCase 
{
	public function testStructure() 
	{
		$sc = bs_header_slider_sc();
		$this->assertEqual($sc, []);
	}
}

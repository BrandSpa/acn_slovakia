<?php
include_once str_replace('translations', '', __DIR__) . 'lib/countries.php';

foreach(getCountries() as $key => $trans) {
	register_translation('bs-' . $key, $trans, 'BS countries');
}
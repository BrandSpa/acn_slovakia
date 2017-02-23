<?php 
$donationTrans = [
	'Other',
	'Monthly',
	'Once',
	'Donate',
	'Next',
	'Back',
	'Amount',
	'Credit Card Number',
	'MM',
	'YY',
	'CVC',
	'Name',
	'Email',
	'Country',
	'Your transaction was not accepted, try again',
	'Incorrect card',
	'Incorrect month',
	'Incorrect year',
	'Incorrect cvc',
	'Incorrect name',
	'Incorrect email',
	'Incorrect country'
];

foreach($donationTrans as $key => $trans) {
	register_translation('bs-' . $key, $trans, 'BS donate');
}

<?php
	include_once 'config.php';
	
	if ($nameGet != "#null" && $scoreGet > -1 && strlen($nameGet) >= 3 && strlen($nameGet) <= 16) {
		// Submit the score
		submitScore($nameGet, $scoreGet, $gameTimeGet, $versionGet);
	}
	$success = true;
	$winners = getScores($amountGet, $pageGet);
	$return = array(
		'success' => $success,
		'pages' => getPages($amountGet),
		'winners' => $winners
	);
	echo(json_encode($return));
?>
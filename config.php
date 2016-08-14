<?php
	//date_default_timezone_set('America/New_York');
	
	$connect = mysql_connect('localhost', 'quaker', 'EQyKzwK8fxtsVP8Q') or die(mysql_error());
	$database = mysql_select_db('quaker', $connect) or die(mysql_error());
	
	$nameGet = "#null";
	$scoreGet = $gameTimeGet = $versionGet = -1;
	$amountGet = 10;
	$pageGet = 1;
	if (isset($_GET['name']) && ctype_alnum(urldecode($_GET['name']))) { $nameGet = urldecode($_GET['name']); }
	if (isset($_GET['score']) && is_numeric(urldecode($_GET['score']))) { $scoreGet = (int)urldecode($_GET['score']); }
	if (isset($_GET['gametime']) && is_numeric(urldecode($_GET['gametime']))) { $gameTimeGet = (int)urldecode($_GET['gametime']); }
	if (isset($_GET['version']) && is_numeric(urldecode($_GET['version']))) { $versionGet = (int)urldecode($_GET['version']); }
	if (isset($_GET['amount']) && is_numeric(urldecode($_GET['amount']))) { $amountGet = (int)urldecode($_GET['amount']); }
	if (isset($_GET['page']) && is_numeric(urldecode($_GET['page']))) { $pageGet = (int)urldecode($_GET['page']); }
	
	function submitScore($name, $score, $gametime, $version = 0) {
		$query = "INSERT INTO `scores` (`name`, `score`, `gametime`, `time`, `version`) VALUES ('" . $name . "', " . $score . ", " . $gametime . ", " . time() . ", " . $version . ")";
		$result = mysql_query($query) or die(mysql_error());
	}
	
	function getScores($amount = 10, $page = 1) {
		$query = "SELECT * FROM `scores` WHERE `version` >= 0 ORDER BY `score` DESC, `gametime` ASC , `time` DESC LIMIT " . $amount*($page-1) . ", " . $amount;
		$result = mysql_query($query) or die(mysql_error());
		$i = 0;
		while ($entry = mysql_fetch_array($result, MYSQL_ASSOC)) {
			$winners[$i][0] = $entry['name'];
			$winners[$i][1] = (string)$entry['score'];
			$gtime = $entry['gametime'];
			$gtimeMinutes = floor($gtime/60);
			$gtime -= $gtimeMinutes*60;
			$gtimeSeconds = $gtime;
			$placeHolder = "";
			if ($gtimeSeconds < 10) { $placeHolder = "0"; }
			$gtimeString = (string)$gtimeMinutes . ":" . $placeHolder . (string)$gtimeSeconds;
			$winners[$i][2] = $gtimeString;
			$winners[$i][3] = date("Y-m-d g:i A", $entry['time']);
			$i++;
		}
		if ($i == 0) {
			$winners[0][0] = "#FAILED";
			$winners[0][1] = "There are no scores in the database yet.";
		}
		return $winners;
	}
	
	function getPages($amount) {
		$query = "SELECT * FROM `scores` WHERE `version` >= 0";
		$result = mysql_query($query) or die(mysql_error());
		return ceil(mysql_num_rows($result) / $amount);
	}
?>

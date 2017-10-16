<?php 
	$db_host = "localhost";
	$db_username = "root";
	//$db_password = '';
	$db_name = "formajax";

	// connect to MySQL Server
	$connect = mysqli_connect($db_host, $db_username, "");

	//connect to database
	mysqli_select_db($connect, $db_name) or die(mysqli_errno($connect));

	//get data
	$username = $_GET["username"];
	$password = $_GET["password"];
	$query = "select * from user where username = '$username'";
	$member = mysqli_query($connect, $query) or die(mysqli_errno($connect));
	$row = mysqli_fetch_assoc($member);
	if ($row != null) {
		if ($row['password'] == $password) {
			echo '<p class="success">Login thành công !.</p>';
		}else{
			echo '<p class="success">Password không đúng !</p>';
		}
	}else {
		echo '<p class="success">Username hoặc password không đúng !</p>';
	}
 ?>
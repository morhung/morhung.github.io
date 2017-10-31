<?php 
	$db_host = "localhost";
	$db_username = "id3265737_hungnd114";
	$db_password = '123456789@';
	$db_name = "id3265737_formajax";

	// connect to MySQL Server
	$connect = mysqli_connect($db_host, $db_username, $db_password);

	//connect to database
	mysqli_select_db($connect, $db_name) or die(mysqli_errno($connect));

	//get data	
	$username = $_GET["username"];
	$password = $_GET["password"];

	if (checkInputUsername($username) == true && checkInputPassword($password) == true) {
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
	} else {
		echo '<p class="success">input fail...</p>';
	}

	//check username received
	function checkInputUsername($username) {
		if (strlen($username) < 8 || strlen($username) < 8) {
			echo '<p class="success">Username in 8-50 character.</p>';
			return false;
		}
		if (preg_match('/[\'^£$%&*()}{@#~?><>,|=_+¬-]/', $username)){
		   echo '<p class="success">Not enter special character.</p>';
		   return false;
		}
		return true;
	}
	
	//check password received
	function checkInputPassword($password) {
		if (strlen($password) < 8 || strlen($password) < 8) {
			echo '<p class="success">Password in 8-50 character.</p>';
			return false;
		}
		return true;
	}
	
 ?>
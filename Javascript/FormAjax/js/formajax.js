
/*check validate the username input*/
function check_inputUsername() {
	var text_username = document.getElementById("username").value;
	var show_err_username = document.getElementById("err_username");
	show_err_username.innerHTML = "";
	if (text_username.length < 8 || text_username.length > 50) {
		show_err_username.innerHTML = "username in 8-50 character";
		return false;
	}
	if (isSpecialCharacter(text_username)) {
		show_err_username.innerHTML = "not enter special character !!";
		return false;
	}
	show_err_username.style.color = "green";
	show_err_username.innerHTML = "OK";
	return true;
}

/*check 1 string have special character? true : false*/
function isSpecialCharacter(str){
 return /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
}

/*check validate the password input*/
function check_inputPassword() {
	var text_password = document.getElementById("password").value;
	var show_err_password = document.getElementById("err_password");
	if (text_password.length < 8 || text_password.length > 30) {
		show_err_password.innerHTML = "Pass in 8-30 character";
		return false;
	}
	show_err_password.style.color = "green";
	show_err_password.innerHTML = "OK";
	return true;
}

/*check validate the email input when user enter*/
function check_inputEmail() {
	var text_email = document.getElementById("email").value;
	var show_err_email = document.getElementById("err_email");
	if (!validateEmail(text_email)) {
		show_err_email.innerHTML = "Email is not valid";
		return false;
	}
	show_err_email.style.color = "green";
	show_err_email.innerHTML = "OK";
	return true;
}

/*check email validate*/
function validateEmail(email) {
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return reg.test(email);
}

/*check date format when user input*/
function check_inputBirthday() {
	var text_birthday = document.getElementById("birthday").value;
	var show_err_birthday = document.getElementById("err_birthday");
	if (!isValidDate(text_birthday)) {
		show_err_birthday.innerHTML = "Date not format";
		return false;
	}
	show_err_birthday.style.color = "green";
	show_err_birthday.innerHTML = "OK";
	return true;
}

/*function check validate date format.*/
function isValidDate(dateString) {
	// First check for the pattern
	var reg = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    if(!reg.test(dateString))
        return false;

    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[2], 10);
    // Check the ranges of month and year
    if(year < 1970 || year > 2099 || month == 0 || month > 12 || day < 1 || day > 31)
        return false;
   return true;
}

/*event when user click button submit
* check all input?
* send username, password to server by ajax.
**/
function submit_check() {
	if (check_inputBirthday() && check_inputUsername() && check_inputPassword()) {
		var xhttp;
		xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				document.getElementById("kq").innerHTML = xhttp.responseText;
			}
		};
		var username = document.getElementById("username").value;
		var password = document.getElementById("password").value;
		var queryString = "?username=" + username + "&password=" + password;
		console.log(queryString);
		xhttp.open("GET", "checklogin.php" + queryString, true);
		xhttp.send();
	} else {
		document.getElementById("kq").innerHTML = "Please input validate !!."
	}
}

/*refresh the input and the error display element*/
function refresh() {
	document.getElementById("username").value = "";
	document.getElementById("password").value = "";
	document.getElementById("email").value = "";
	document.getElementById("birthday").value = "";
	document.getElementById("err_username").value = "";
	document.getElementById("err_password").value = "";
	document.getElementById("err_email").value = "";
	document.getElementById("err_birthday").value = "";
}
var newDate = new Date();
var current_month = newDate.getMonth();
var current_year = newDate.getFullYear();
var day_td = document.getElementsByTagName("td");
var select_year = document.getElementById("years");
var select_month = document.getElementById("month");

fillMonthYear();

function createCalendar(month, year) {
	let i;
	let firstDay = new Date(year, month, 1).getDay(); /* First day of Month*/
	let totalday_td = new Date(year, month + 1, 0).getDate(); /* Total day in month */
	let indexDay = 21 + firstDay; /* index of td element when fill the day of month to the table calendar*/
	for (i = 21; i < 62; i++) { 
		day_td[i].innerHTML = "";
		day_td[i].style.background = "white"; /*set white background to td element from 21 to 61*/
	}
	for (i = 1; i <= totalday_td; i++) {
		day_td[indexDay].innerHTML = i;
		indexDay++;
	}

	/*get current date*/
	if (year === newDate.getFullYear()) {
		if (month === newDate.getMonth()) {
			let cur_Day = 20 + firstDay + newDate.getDate();
			day_td[cur_Day].style.background = "blue";
		}		
	}
	select_year.value = current_year;
	select_month.value = current_month;
}

/*
Fill auto month and year to option in selection
 */
function fillMonthYear() {
	let i, j, len;
	let month_arr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	
	for (i = 0, len = month_arr.length; i < len; i++) {
		select_month.innerHTML += "<option value='" + i + "'>" + month_arr[i] + "</option";
	}
	for (j = 1970; j < 2100; j++){
		select_year.innerHTML += "<option value='" + j + "'>" + j + "</option";
	}
	createCalendar(current_month, current_year);
}

/*Select the month*/
function selectMonth() {
	current_month = parseInt(select_month.value);
	createCalendar(current_month, current_year);
}

/* Select the year*/
function selectYear() {
	current_year = select_year.value;
	createCalendar(current_month, current_year);
}

/*Change (pre or next) the month*/
function nextMonth(m) {
	current_month = parseInt(current_month) + parseInt(m);
	if (current_month > 11) {
		current_month = 0;
		current_year += parseInt(1);
	}
	if (current_month < 0) {
		current_month = 11;
		current_year -= parseInt(1);
	}
	createCalendar(current_month, current_year);
}

/*Change (pre or next) the year*/
function nextYear(y) {
	current_year = parseInt(current_year) + y;
	if (current_year < 1970) {
		current_year = 2099;
	}
	if (current_year > 2099) {
		current_year = 1970;
	}
	createCalendar(current_month, current_year);
}

/* Show table calendar when click
*  Set and listen click event to td element (index 21 -> 61)
*  hidden table calendar when set day finished.
*/
function inputBirthday() {
	var birthday = document.getElementById("birthday");
	var table_calendar = document.getElementById("table_calendar");
	table_calendar.style.display = "block";
	for (var i = 21; i <= 62; i++) {
		day_td[i].addEventListener("click", function() {
			let check_day = this.innerHTML;
			if (check_day != "") {
				console.log(check_day);
				birthday.value = check_day + "/" +current_month + "/"+current_year;
				table_calendar.style.display = "none";
			}
		});
	}
}
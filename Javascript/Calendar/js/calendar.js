var NEWDATE = new Date();
var CURRENT_MONTH = NEWDATE.getMonth();
var CURRENT_YEAR = NEWDATE.getFullYear();
var DAY_TD = document.getElementsByTagName("td");
var SELECT_YEAR = document.getElementById("years");
var SELECT_MONTH = document.getElementById("month");

hiddenTableCalendar();
fillMonthYear();

function createCalendar(month, year) {
	let i;
	let firstDay = new Date(year, month, 1).getDay(); /* First day of Month*/
	let totalDAY_TD = new Date(year, month + 1, 0).getDate(); /* Total day in month */
	let indexDay = 13 + firstDay; /* index of td element when fill the day of month to the table calendar*/
	
	for (i = 13; i < 55; i++) {
		DAY_TD[i].innerHTML = "";
		DAY_TD[i].style.background = "white"; /*set white background to td element from 21 to 61*/
	}
	for (i = 1; i <= totalDAY_TD; i++) {
		DAY_TD[indexDay].innerHTML = i;
		indexDay++;
	}
	if (year === new Date().getFullYear()) {
		console.log("year: ", year);
		if (month === new Date().getMonth()) {
			console.log("month: ", month);
			let cur_Day = 12 + firstDay + NEWDATE.getDate();
			DAY_TD[cur_Day].style.background = "blue";
		}		
	}
	SELECT_YEAR.value = CURRENT_YEAR;
	SELECT_MONTH.value = CURRENT_MONTH;
}

/*
Fill auto month and year to option in selection
 */
function fillMonthYear() {
	let i, j, len;
	let month_arr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	
	for (i = 0, len = month_arr.length; i < len; i++) {
		SELECT_MONTH.innerHTML += "<option value='" + i + "'>" + month_arr[i] + "</option";
	}
	for (j = 1970; j < 2100; j++){
		SELECT_YEAR.innerHTML += "<option value='" + j + "'>" + j + "</option";
	}
	createCalendar(CURRENT_MONTH, CURRENT_YEAR);
}


/*Select the month*/
function selectMonth() {
	CURRENT_MONTH = parseInt(SELECT_MONTH.value);
	createCalendar(CURRENT_MONTH, CURRENT_YEAR);
}


/* Select the year*/

function selectYear() {
	CURRENT_YEAR = parseInt(SELECT_YEAR.value);
	createCalendar(CURRENT_MONTH, CURRENT_YEAR);
}

/*Change (pre or next) the month*/
function nextMonth(m) {
	CURRENT_MONTH = parseInt(CURRENT_MONTH) + parseInt(m);
	if (CURRENT_MONTH > 11) {
		CURRENT_MONTH = 0;
		CURRENT_YEAR += parseInt(1);
	}
	if (CURRENT_MONTH < 0) {
		CURRENT_MONTH = 11;
		CURRENT_YEAR -= parseInt(1);
	}
	createCalendar(CURRENT_MONTH, CURRENT_YEAR);
}

/*Change (pre or next) the year*/
function nextYear(y) {
	CURRENT_YEAR = parseInt(CURRENT_YEAR) + y;
	if (CURRENT_YEAR < 1970) {
		CURRENT_YEAR = 2099;
	}
	if (CURRENT_YEAR > 2099) {
		CURRENT_YEAR = 1970;
	}
	createCalendar(CURRENT_MONTH, CURRENT_YEAR);
}

/* Show table calendar when click
*  Set and listen click event to td element (index 21 -> 61)
*  hidden table calendar when set day finished.
*/
function inputBirthday() {
	var birthday = document.getElementById("birthday");
	var table_calendar = document.getElementById("table_calendar");
	
	table_calendar.style.display = "block"; //when click icon calendar, table calendar display.

	/*add event click to td element had index 13-52*/
	for (var i = 13; i < 55; i++) {
		DAY_TD[i].addEventListener("click", function() {
			let check_day = this.innerHTML;
			if (check_day != "") {
				console.log(check_day);
				birthday.value = check_day + "/" +CURRENT_MONTH + "/"+CURRENT_YEAR;
				table_calendar.style.display = "none";
			}
		});
	}

	/*add event mouse to td element had index 13-52*/
	for (var i = 13; i < 55; i++) {
		DAY_TD[i].addEventListener("mouseover", function() {
			let check_day = this;
			check_day.className = "effect";
		});
		DAY_TD[i].addEventListener("mouseout", function() {
			let check_day = this;
			check_day.className = "";
		});
	}
}

/*hidden the table calendar when user click button input calendar but not using, enter to input date.*/
function hiddenTableCalendar() {
	var table_calendar = document.getElementById("table_calendar");
	
	table_calendar.style.display = "none";
}
var NEWDATE = new Date();
var CURRENT_MONTH = NEWDATE.getMonth();
var CURRENT_YEAR= NEWDATE.getFullYear();
var TABLE_CALENDAR = $("#table_calendar");
var MONTH_NAME = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var DAY_NAME = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var WRAP_INPUT = $("#text-display");
var IMG_CALENDAR = $("#img_calendar");
var PRE_MONTH = $("<button>");
var PRE_YEAR = $("<button>");
var NEXT_MONTH = $("<button>");
var NEXT_YEAR = $("<button>");
var TD = $("<td>");

IMG_CALENDAR.css({"width": "30px", "height": "30px"});
WRAP_INPUT.css({"display": "inline-flex"});
TD.css({"width": "50px", "height": "25px", "border": "1px solid pink"});

//add event click call Show when click INPUT
IMG_CALENDAR.click(function() {
    show();
});

//show the calendar.
function show() {
    var first_date = MONTH_NAME[CURRENT_MONTH] + " " + 1 + " " + CURRENT_YEAR; 
    var tmp = new Date(first_date).toDateString();
    var first_day = tmp.substring(0, 3); //Mon
    var days_empty_td = DAY_NAME.indexOf(first_day); //1
    var days = new Date(CURRENT_YEAR, CURRENT_MONTH + 1, 0).getDate(); //30
    var calendar = draw(days_empty_td, days);

    //remove event click in img_calendar
    IMG_CALENDAR.off('click');

    calendar.insertAfter($("#form"));
}

function draw(days_empty_td, days) {
    var table = $("<table>", {"id": "table_calendar"});
    var tr = $("<tr>");

    table.css({"text-align": "center", "background-color": "hotpink"});
    table.parent().css("background-color", "black");

    //Pre Year Button.
    var td_preY = $("<td>");

	PRE_YEAR.html("<<");
	PRE_YEAR.click(function() {
		if (CURRENT_YEAR == 1970) {
            CURRENT_YEAR = 2100;
        }

        if (CURRENT_YEAR > 1970) {
            CURRENT_YEAR--;
            table.remove();
            show();
        }
	});
	td_preY.append(PRE_YEAR);
	tr.append(td_preY);

	//pre Month button
    var td_preM = $("<td>");

	PRE_MONTH.html("<");
	PRE_MONTH.click(function() {
		if (CURRENT_MONTH == 0) {
            CURRENT_MONTH = 12;
            CURRENT_YEAR--;
        }

        if (CURRENT_MONTH > 0) {
            CURRENT_MONTH--;
            table.remove();
            show();
        }           
	});
	td_preM.append(PRE_MONTH);
	tr.append(td_preM);

	//select month  element
	var tdM = $("<td>");

    listMonth = $("<select>", {"id": "listMonth"});
	listMonth.change(function() {
		CURRENT_MONTH = $("#listMonth option:selected").index();
		console.log("chose month: ", CURRENT_MONTH);
        table.remove();
		show();
	});
    tdM.append(listMonth);
    tdM.attr("colspan", "2");
    tr.append(tdM);

    //set value option in month select element
    for (var i = 0; i < 12; i++) {
        option = $("<option>");
        option.text(MONTH_NAME[i]);
        if (i == CURRENT_MONTH) {
            option.prop("selected", true);
        }
        listMonth.append(option);
    }

	//select year element
	var tdY = $("<td>");

    listYear = $("<select>", {"id": "listYear"});
	listYear.change(function() {
		CURRENT_YEAR = $("#listYear option:selected").val();
		table.remove();
		show();
	});
    tdY.append(listYear);
    tr.append(tdY);

    //set value option to year select element
	for (var j = 1970; j < 2100; j++) {
		option = $("<option>");
		option.val(j);
		option.text(j);
        if (j == CURRENT_YEAR) {
            option.prop("selected", true);
        }
		listYear.append(option);
	}		
    
	 //next month button.
    var td_nextM = $("<td>");

    NEXT_MONTH.text(">");
    NEXT_MONTH.click(function() {
        if (CURRENT_MONTH == 11) {
            CURRENT_MONTH = -1;
            CURRENT_YEAR++;
        }

        if (CURRENT_MONTH < 11) {
            CURRENT_MONTH++;
            table.remove();
            show();
        } 
    });
    td_nextM.append(NEXT_MONTH);
    tr.append(td_nextM);
    table.append(tr);

    //next year button (+1 or -1)
    var td_nextY = $("<td>");

    NEXT_YEAR.text(">>");
    NEXT_YEAR.click(function() {
        if (CURRENT_YEAR == 2099) {
            CURRENT_YEAR = 1969;  
        }
              
        if (CURRENT_YEAR < 2099) {
            CURRENT_YEAR++;
            table.remove();
            show();
        }
    });
    td_nextY.append(NEXT_YEAR);
    tr.append(td_nextY);

    //set the name of day to td elements..
    var tr = $("<tr>");

    for (var nameDay = 0; nameDay < 7; nameDay++) {
        td = $("<td>", {"class":"week"});
        td.html(DAY_NAME[nameDay]);
        tr.append(td);
    }
    table.append(tr);

    //Print day empty in month
    var tr = $("<tr>");
    var cols;

    for (cols = 0; cols < 7; cols++) {
        if (cols === days_empty_td) {
            break;
        }
        td = $("<td>");
        td.empty();
        td.css("background-color", "white");
        tr.append(td);
    }

    //day in month
    var count = 1;

    for (; cols <  7; cols++) {
        td = $("<td>", {"class":"days"});
        td.css("background-color", "white");
        tdhover(td);
        if (count == NEWDATE.getDate() && CURRENT_MONTH == NEWDATE.getMonth && CURRENT_YEAR == NEWDATE.getFullYear()) {
            td.css({"background": "gray"});
        }
        td.html(count);
        td.click(function(event){
            SubmitDate(event);
        });
        count++;      
        tr.append(td);
    }
    table.append(tr);

    for (var rows = 3; rows <= 7; rows++) {
        tr = $("<tr>");
        for (var col = 0; col <= 6; col++) {
            if (count > days) {
                table.append(tr);
                return table;
            }
            td = $("<td>", {"class":"days"});
            td.css("background-color", "white");          
            tdhover(td); //set hover when move mouse to td.
            if (count == NEWDATE.getDate() && CURRENT_MONTH == NEWDATE.getMonth() && CURRENT_YEAR == NEWDATE.getFullYear()) {
                td.css({"background": "gray"});
            }
            td.html(count);

            //set event click to days in td.
            td.click(function(e){
                SubmitDate(e);
            });

            count++;
            tr.append(td);
        }
        table.append(tr);
    }
}

//hover in day when mouse move
function tdhover(td) {
    td.hover(
        function() {$(this).css({"border": "0.5px solid gray", "cursor": "pointer"});},
        function() {$(this).css("border", "none");}       
    );
}

//event when click choose day.
function SubmitDate(e) {
    var day = $(e.target).text();
    var div = $(e.target).closest("#table_calendar");
    var date = day + "/" + (parseInt(CURRENT_MONTH) + 1) + "/" + CURRENT_YEAR;

    $("#input_calendar").val(date); //set value to textbox
    div.remove(); //remove calendar

    //turn on click in img_calendar
    IMG_CALENDAR.click(function(){
        show();
    });
}


$(document).ready(function() {
    var currentDay = moment().format('dddd, MMMM Do YYYY');
    $("#currentDay").text(currentDay); // Display current date in header at loading
    $("#currentTime").text(moment().format ('hh:mm a')); // Display current time in footer at loading
    var eventList = {};                                  // To store all events
   
    var container = $(".container").addClass("mb-5 pb-5");  

    /*** Build the planning ***/
    function createPlanning() {
        for (let i = 0; i <= 8; i++){
            let hr = 9 + i;
            var row = $("<div></div>").attr({
                "class": "row time-block",
                "hour-block": `${[hr]}`
            });
            var col1 = $("<div></div>").attr({
                "class": "hour px-0 col-sm-2",
                "hour-block": `${[hr]}`
            });
            // Change the display for am/pm
            if (hr <= 12) {
                col1.text(`${hr}:00 a.m.`);
            } else {
               col1.text(`${hr - 12}:00 p.m.`);
            };

            var col2 = $("<textarea></textarea>").attr({
                "class": "description col-sm-9",
                "hour-block": `${[hr]}`
            });
            
            var col3 = $("<button></button>").attr({
                "class": "saveBtn col-sm-1",
                "hour-block": `${[hr]}` 
            });
            col3.append(`<i class="fas fa-save"></i>`);
            
            row.append(col1, col2, col3); 
            container.append(row);
        }     
    }
    
    /*** Set the class of textarea base on the time***/
    function statusColor() {
        $(".time-block").each(function() {
            var hourBlock = parseInt($(this).attr("hour-block"));
            let textArea = $(".description", this);
            let currentHr = moment().hour()     // TOFIX: Static hr
            //Change the class based on the current time
            if (hourBlock < currentHr) {
                textArea.addClass("past");
            } else if (hourBlock > currentHr) {
                textArea.addClass("future");
            } else { textArea.addClass("present"); }
        });
    }

    // Populate eventList object  
    if (localStorage.getItem("eventsList")) {
        eventList = JSON.parse(localStorage.getItem("eventsList"));
    } else {        // if eventsList was empty, create eventList by populating its key time
        eventList = {          
            '9': { time: "9", eventText: ""},
            '10':{ time: "10", eventText: ""},
            '11':{ time: "11", eventText: ""},
            '12':{ time: "12", eventText: ""},
            '13':{ time: "13", eventText: ""},
            '14':{ time: "14", eventText: ""},
            '15':{ time: "15", eventText: ""},
            '16':{ time: "16", eventText: ""},
            '17':{ time: "17", eventText: ""}
        };
    }  
    
    createPlanning();
    statusColor();

    /*** To display all previous events ***/
    $(".time-block").each(function () {
        let blockIndex = parseInt($(this).attr("hour-block"));
        let text = eventList[blockIndex].eventText; 
        $(`.description[hour-block="${blockIndex}"]`).val(text);
    });

    /*** To save after clicking on save button ***/
    $(".saveBtn").on("click", function() {
        let blockIndex = parseInt($(this).attr("hour-block"));
        let textArea = $(`.description[hour-block="${blockIndex}"]`);
        eventList[blockIndex].eventText= textArea.val();
        localStorage.setItem("eventsList", JSON.stringify(eventList));
     });

    /*** Update clock in footer ***/
    setInterval(function(){
        let currentTime = moment().format ('hh:mm a')
        $("#currentTime").text(currentTime);    // Display current time in footer
    }, 1000);

});

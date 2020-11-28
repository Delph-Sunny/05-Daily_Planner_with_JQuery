$(document).ready(function() {
   var currentDay = moment().format('dddd, MMMM Do YYYY');
   $("#currentDay").text(currentDay); // Display current date in header at loading
   $("#currentTime").text(moment().format ('hh:mm a')); // Display current time in footer at loading
     
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
    
    /*** Set the class of textarea ***/
    function statusColor() {
        $(".time-block").each(function() {
            var hourBlock = parseInt($(this).attr("hour-block"));
            let textArea = $(".description", this);
            let currentHr = moment().hour()  // TOFIX: Static hr
            //Change the class based on the current time
            if (hourBlock < currentHr) {
                textArea.addClass("past");
            } else if (hourBlock > currentHr) {
                textArea.addClass("future");
            } else { textArea.addClass("present"); }
        });
    }

    // Array for storage purposes
    const EventList = JSON.parse(localStorage.getItem("eventsList")) || [];   // To store events for each hrs


    createPlanning();
    statusColor();

    $(".saveBtn").on("click", function(event) {
        var blockIndex = parseInt($(event.target).closest(".time-block").attr("hour-block"));
        var textArea = $(`.description[hour-block="${blockIndex}"]`);  
        
        var eventTime = {
            time: blockIndex,
            event: textArea.text()   //TO FIX: Not working
        };
        console.log(textArea);   // TO FIX : Testing
     });

   /*** Update clock in footer ***/
   setInterval(function(){
        var currentTime = moment().format ('hh:mm a')
        $("#currentTime").text(currentTime);    // Display current time in footer
    }, 1000);

});

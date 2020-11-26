$(document).ready(function() {
    var currentDay = moment().format('dddd, MMMM Do YYYY');
   $("#currentDay").text(currentDay); // Display current date in header at loading
   $("#currentTime").text(moment().format ('hh:mm a')); // Display current time in footer at loading
   






   /*** Update clock in footer ***/
    setInterval(function(){
        currentTime = moment().format ('hh:mm a')
        $("#currentTime").text(currentTime);    // Display current time in footer
    }, 1000);

});

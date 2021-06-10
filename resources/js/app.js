




//timepicker 
$('.timepicker1').timepicker({
    timeFormat: 'H:mm',
    interval: 30,
    minTime: '8',
    maxTime: '7:00PM',
    startTime: '10:00',
    dynamic: false,
    dropdown: true,
    scrollbar: true
});


$('.timepicker2').timepicker({
    timeFormat: 'h:mm p',
    interval: 30,
    minTime: '11',
    maxTime: '7:00PM',
    startTime: '10:00',
    dynamic: false,
    dropdown: true,
    scrollbar: true
});

$('[data-toggle="datepicker"]').datepicker();

var now = Date.now();

$().datepicker({
  filter: function(date, view) {
    if (date < now) {
      return false; // Disable all Sundays, but still leave months/years, whose first day is a Sunday, enabled.
    }
  }
});




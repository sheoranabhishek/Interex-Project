

//timepicker 
$('.timepicker1').timepicker({
    timeFormat: 'H:mm p',
    interval: 30,
    minTime: '8',
    maxTime: '7:00PM',
    startTime: '8:00PM',
    dynamic: true,
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


//datepicker configuration
var now = Date.now();
$('[data-toggle="datepicker"]').datepicker(
  {
    format: 'mm/dd/yyyy',
    startDate: now
  }
);










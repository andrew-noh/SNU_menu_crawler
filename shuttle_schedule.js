var shuttles = {
  "time_line_01" : {
                    "start_hour": 7,
                    "start_min": 0,
                    "end_hour": 8,
                    "end_min": 0,
                    "time_window": 15
                  },

  "time_line_02" : {
			              "start_hour": 8,
                    "start_min": 0,
                    "end_hour": 8,
                    "end_min": 30,
                    "time_window": 5
                  },

  "time_line_03" : {
                    "start_hour": 8,
                    "start_min": 30,
                    "end_hour": 10,
                    "end_min": 0,
                    "time_window": 3
                  },

  "time_line_04" : {
                    "start_hour": 10,
                    "start_min": 0,
                    "end_hour": 11,
                    "end_min": 0,
                    "time_window": 5
                  },

  "time_line_05" : {
                    "start_hour": 11,
                    "start_min": 0,
                    "end_hour": 15,
                    "end_min": 30,
                    "time_window": 10
                  },

  "time_line_06" : {
                    "start_hour": 15,
                    "start_min": 30,
                    "end_hour": 17,
                    "end_min": 0,
                    "time_window": 4
                  },

  "time_line_07" : {
                    "start_hour": 17,
                    "start_min": 0,
                    "end_hour": 18,
                    "end_min": 0,
                    "time_window": 4
                  },

  "time_line_08" : {
                    "start_hour": 18,
                    "start_min": 0,
                    "end_hour": 19,
                    "end_min": 0,
                    "time_window": 6
                  }
};

var parsed_object = JSON.parse(JSON.stringify(shuttles));

/*
function getTime() {
  var d = new Date();
  //var d2 = new Date(d.getTime() + 86400000);
  var time_hr = d.getHours();
  var minute_min = d.getMinutes();
  var timeNow = time_hr + ":" + minute_min;
  return timeNow;
}
*/

function getTimeInMin() {
  var d = new Date();
  //var d2 = new Date(d.getTime() + 32400000);
  var time_hr = d.getHours();
  var minute_min = d.getMinutes();
  var timeInMin = time2min(time_hr, minute_min);
  return timeInMin;
}

function time2min(hours, minutes) {
  var minutes_num = hours * 60 + minutes;
  return minutes_num
}

function generateSchedule(window_min) {
  var bus_times_min = 60 / window_min;
  var schedules = [];
  for (var min = 0; min < bus_times_min + 1; min++) {
    schedules.push(min * window_min);
  }
  return schedules;
}


var current_time = getTimeInMin();

for (var bus in parsed_object) {
  var st_hour = shuttles[bus].start_hour;
  var st_minute = shuttles[bus].start_min;
  var end_hour = shuttles[bus].end_hour;
  var end_minute = shuttles[bus].end_min;
  var zone_start_time = time2min(st_hour, st_minute);
  var zone_end_time = time2min(end_hour, end_minute);
  var mins_left;
  var next_shuttle_hr;
  var next_shuttle_min;
  if (current_time > zone_start_time && current_time < zone_end_time) {
    next_shuttle_hr = shuttles[bus].start_hour;
    var currentschedule_min = generateSchedule(parsed_object[bus].time_window);
    //console.log(String(bus));
    console.log(currentschedule_min);

    // Get time left
    var d = new Date();
    //var d2 = new Date(d.getTime() + 32400000);
    var cur_time_min = d.getMinutes();

    console.log("Current minute: " + cur_time_min);

    // Calculate minutes left
    for (var schedule = 0; schedule < currentschedule_min.length; schedule++) {
      if (cur_time_min > currentschedule_min[schedule] && cur_time_min < currentschedule_min[schedule+1]) {
        mins_left = currentschedule_min[schedule+1] - cur_time_min;
        next_shuttle_min = currentschedule_min[schedule+1];
        if (currentschedule_min[schedule+1] === 60) {
          next_shuttle_hr = next_shuttle_hr + 1;
          next_shuttle_min = "00";
        };
      };
    };
  } else {
    continue;
  };
};

var next_shuttle_time = next_shuttle_hr + ":" + ("0" + next_shuttle_min).slice(-2);

if (mins_left === undefined || mins_left === null) {
  console.log("셔틀버스가 없습니다.");
} else {
  console.log(mins_left + " minutes left &" + "Next shuttle time is: " + next_shuttle_time);
};

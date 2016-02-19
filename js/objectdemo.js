var outerSpaceMovie = {
  title : "Outer Space",
  genre : "cult classis",
  rating : 2,
  showtimes : ["3:00 PM", "7:00 PM", "11:00 PM"]
};

var forbiddenPlanetMovie = {
  title : "Forbidden Planet",
  genre : "classis sci-fi",
  rating : 5,
  showtimes : ["5:00 PM", "9:00 PM"]
};

function getNextShowing(movie){
  var now = new Date().getTime();
  
  for(var i = 0; i < movie.showtimes.length; i++){
      var showTime = getTimeFromString(movie.showtimes[i]);
      console.log(showTime);
      if((showTime - now) > 0){
          return "Next showing of "+movie.title + " is " + movie.showtimes[i];
      }
  }
  return null;
}

function getTimeFromString(timeString){
    var theTime = new Date();
    var time = timeString.match(/(\d+)(?::(\d\d))?\s*(p?)/);
    theTime.setHours(parseInt(time[1]) + (time[3] ? 12 : 0));
    theTime.setMinutes(parseInt(time[2]) || 0);
    return theTime.getTime();
}

var nextShowing = getNextShowing(outerSpaceMovie);
alert(nextShowing);

nextShowing = getNextShowing(forbiddenPlanetMovie);
alert(nextShowing);
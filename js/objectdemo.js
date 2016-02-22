function getTimeFromString(timeString){
    var theTime = new Date();
    var time = timeString.match(/(\d+)(?::(\d\d))?\s*(p?)/);
    theTime.setHours(parseInt(time[1]) + (time[3] ? 12 : 0));
    theTime.setMinutes(parseInt(time[2]) || 0);
    return theTime.getTime();
};

function Movie(title, genre, rating, showtimes){
    this.title = title;
    this.genre = genre;
    this.rating = rating;
    this.showtimes = showtimes;
    this.getNextShowing = function() {
      var now = new Date().getTime();

      for(var i = 0; i < this.showtimes.length; i++){
      var showTime = getTimeFromString(this.showtimes[i]);
      if((showTime - now) > 0){
          return "Next showing of "+this.title + " is " + this.showtimes[i];
      }
    }
    return null;
  };
}

var outerSpaceMovie = new Movie("Outer Space", "cult classis", 2, ["3:00 PM", "7:00 PM", "11:00 PM"]);

var forbiddenPlanetMovie = new Movie("Forbidden Planet", "classis sci-fi", 5, ["5:00 PM", "9:00 PM"]);

var nextShowing = outerSpaceMovie.getNextShowing();
alert(nextShowing);

nextShowing = forbiddenPlanetMovie.getNextShowing();
alert(nextShowing);

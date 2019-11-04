var TimeData = function() {
  var o = {
    blockMode: true,
  }
  var unitCount = 10 // TODO
  var times = []

  var resetData = function() {
    times = []
  }

  var dayLen = function() {

  }

  // only for block mode
  var unitLen = function() {
    return (1 / unitCount) * 100
  }

  o.setUnitCount = function(n) {
    if (blockMode) {
      unitCount = n
    }
  }

  o.switchMode = function() {
    blockMode = !blockMode
    resetData()
  }

  o.addATime = function(week, day, percentPosition, percentLen) {
    var weekTimes = times[week - 1]
    var dayTimes = weekTimes[day - 1]

    if (blockMode) {
      var start = dayLen() * percentPosition / 100
      dayTimes.push(start)
    } else {
      var start = dayLen() * percentPosition / 100
      var len = dayLen() * percentLen / 100
      dayTimes.push([start, len])
    }
  }

  o.tryAddATime = function(week, day, percentPosition, percentLen) {

  }

  o.setWeekCount = function(num) {
    for (var i = 0; i < num; ++i) {
      o.addWeek()
    }
  }

  o.addWeek = function() {
    times.push([])
  }

  o.getShowData = function() {

  }

  return o
}
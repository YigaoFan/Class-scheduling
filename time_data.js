var TimeData = function() {
  var o = {
    blockMode: true,
    unitCount: 10,
    times: [],
  }

  var resetData = function() {
    times = []
  }

  var dayLen = function() {

  }

  // only for block mode
  var unitLen = function() {
    return (1 / o.unitCount) * 100
  }

  var transformBlockTime = function(timeData) {
    var transformed = []
    timeData.forEach(e => {
      // 0 1 2 block 的时间应该是这样的，只需要知道哪些是确定的
      transformed.push([
        e[0], // week
        e[1], // day
        (e[2] / o.unitCount) * 100, // start
        (1 / o.unitCount) * 100, // len
      ])
    })
  }

  var transformDetailTime = function(timeData) {
    var transformed = []
    timeData.forEach(e => {
      
    })
  }

  o.init = function(weekCount, dayCount) {
    for (var i = 0; i < weekCount; ++i) {
      o.addWeek(dayCount)
    }
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

  o.addWeek = function(dayCount) {
    var week = []
    for (var i = 0; i < dayCount; ++i) {
      week.push([])
    }

    o.times.push(week)
  }

  o.getFormatTimeData = function() {
    var data = []
    o.times.forEach((weekArray, iWeek) => {
      weekArray.forEach((dayArray, iDay) => {
        dayArray.forEach(time => {
          data.push([iWeek, iDay, time])
        })
      })
    })

    if (o.blockMode) {
      return transformBlockTime(data)
    }

    return transformDetailTime(data)
  }

  return o
}
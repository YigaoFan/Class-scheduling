// 加一个计算各个班级之间的时间重合度的功能，方便班级之间的分组
var TimeData = function(range) {
  var o = {
    range: range, // format like [8, 20]
    blockMode: true,
    unitCount: 10,
    times: [],
  }

  var resetData = function() {
    times = []
  }

  var dayLen = function() {
    return range[1] - range[0]
  }

  // [8.0 - 12.0]
  var calTimeStartAndLenInDecimal = function(detailTime) {
    var totalLen = range[1] - range[0]
    var start = (detailTime[0] - range[0]) / totalLen
    var len = (detailTime[1] - detailTime[0]) / totalLen
    return [ start, len, ]
  }

  var transformBlockTime = function(timeDatas) {
    var transformed = []
    timeDatas.forEach(e => {
      // e[2]: 0 1 2 block 的时间应该是这样的，只需要知道哪些是确定的
      transformed.push([
        e[0], // week
        e[1], // day
        e[2] / o.unitCount, // start
        1 / o.unitCount, // len
      ])
    })

    return transformed
  }

  var transformDetailTime = function(timeData) {
    var transformed = []
    timeData.forEach(e => {
      transformed.push([
        e[0],
        e[1],
      ].concat(calTimeStartAndLenInDecimal(e[2])))
    })

    return transformed
  }

  o.init = function(weekCount, dayCount) {
    for (var i = 0; i < weekCount; ++i) {
      o.addWeek(dayCount)
    }
  }

  // only for block mode
  o.unitLen = function() {
    return 1 / o.unitCount
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
    var weekTimes = o.times[week]
    var dayTimes = weekTimes[day]
    var start = dayLen() * percentPosition + range[0]

    if (o.blockMode) {
      dayTimes.push(start)
    } else {
      var len = dayLen() * percentLen
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
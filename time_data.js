// 加一个计算各个班级之间的时间重合度的功能，方便班级之间的分组
// detail mode 下不支持使用鼠标点击修改时间o
var TimeData = function(range) {
  o = {
    range: range, // format like [8, 20]
    blockMode: true,
    unitCount: 10,
    times: [], // 存储 ViewUnit 显示的格式的数据，当需要输出具体时间的时候，再利用函数转换
  }

  var resetData = function() {
    o.times = []
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
      var week = []
      for (var j = 0; j < dayCount; ++j) {
        week.push([])
      }

      o.times.push(week)
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

  o.convertToFitUnit = function(percentPosition, percentLen) {
    for (var i = 0, lowRange = 0; i < o.unitCount; ++i, lowRange+=o.unitLen()) {
      if (lowRange < percentPosition && percentPosition <= (lowRange+o.unitLen())) {
        return [
          lowRange,
          percentLen,
        ]
      }
    }
  }

  // 注意：很多操作都是只限定 blockMode 下操作
  o.addATime = function(week, day, percentPosition, percentLen, color) {
    if (!o.blockMode) {
      return
    }

    var weekTimes = o.times[week]
    var dayTimes = weekTimes[day]
    var data = o.convertToFitUnit(percentPosition, percentLen)
    data.push(color)
    dayTimes.push(data)
  }

  o.tryAddATime = function(week, day, percentPosition, percentLen) {

  }

  o.setWeekCount = function(num) {
    for (var i = 0; i < num; ++i) {
      o.addWeek()
    }
  }

  o.addWeek = function() {
    // 这个类的结构和 ViewUnit 的结构还是不太一样的，这个 times 里面直接存的数据
    dayCount = o.times[0].length
    var week = []
    // 当 dayCount 不是一个数的时候，下面不能运行，但再下面那句 push 竟然会运行！
    for (var i = 0; i < dayCount; ++i) {
      week.push([])
    }

    o.times.push(week)
  }

  o.delWeek = function () {
    o.times.pop()
  }

  o.delDay = function() {
    o.times.forEach(week => {
      week.pop()
    })
  }

  o.addDay = function() {
    o.times.forEach(week => {
      week.push([])
    })
  }
  // o.getFormatTimeData = function() {
  //   var data = []
  //   o.times.forEach((weekArray, iWeek) => {
  //     weekArray.forEach((dayArray, iDay) => {
  //       dayArray.forEach(time => {
  //         data.push([iWeek, iDay, time])
  //       })
  //     })
  //   })

  //   return data
  // }

  o.queryTimesInADay = function(weekIndex, dayIndex) {
    // log('Times: ', o.times)
    // log('Week index: ', weekIndex)
    // log('Day index: ', dayIndex)
    var weekTimes = o.times[weekIndex]
    // log('Week time: ', weekTimes)
    return weekTimes[dayIndex]
  }

  o.clearSavedData = function() {
    o.times.forEach(week => {
      week.forEach(day => {
        day.length = 0
      })
    })
  }

  var isSameTime = function(time1, time2) {
    // log('Time1: ', time1)
    // log('Time2: ', time2)
    for (var i = 0; i < 2; ++i) {
      if (time1[i]-time2[i]) { // JS 中 == 有一定的宽容度
        return false
      }
    }

    return true
  }

  // 和 week 拥有一样的层次结构
  var computeSameTimesBetweenWeek = function (week1, week2) {
    if (week1 == null) {
      return week2
    }

    var sameInWeek = []
    week1.forEach((day, i) => {
      var sameInDay = []
      day.forEach(time1 => {
        week2[i].forEach(time2 => {
          if (isSameTime(time1, time2)) {
            sameInDay.push(time1)
          }
        })
      })
      sameInWeek.push(sameInDay)
    })

    return sameInWeek
  }

  o.computeOverlapTime = function () {
    // TODO 目前计算的 block mode 下的重叠时间，非 block mode 下的会复杂一点
    o.clearDuplicateTime()
    // 在 Block Mode 下可能会存在由于多次点击而存在相同时间多次出现
    var sameTimes = null
    o.times.forEach(week => {
      sameTimes = computeSameTimesBetweenWeek(sameTimes, week)
    })

    return sameTimes
  }

  forTest = o.computeOverlapTime

  // JS 在有的情况下是不会抛异常的，比如有的操作其实不能正常运行的时候，
  // 这个时候运行的顺序我就有些不知道了
  var clearDuplicateInDay = function (sortedTimesOfDay) {
    var times = sortedTimesOfDay
    for (var i = 0; i < sortedTimesOfDay.length-1; ++i) {
      if (isSameTime(times[i], times[i+1])) {
        times.splice(i, 1)
        clearDuplicateInDay(times)
        break
      }
    }
  }

  o.clearDuplicateTime = function() {
    if (!o.blockMode) {
      return
    }

    o.times.forEach(week => {
      week.forEach(day => {
        day.sort()
        clearDuplicateInDay(day)
      })
    })
  }

  return o
}
var ViewUnit = function (startPointX, startPointY, width, height, drawOrNot = true) {
  var o = {
    drawOrNot: drawOrNot,
    startX: startPointX,
    startY: startPointY,
    width: width,
    height: height,
    subUnits: [],
    selected: false,
    color: null,
  }


  var drawLine = function (context, x, y) {
    context.beginPath()
    context.moveTo(o.startX, y)
    context.lineTo(o.startX + o.width, y)
    context.closePath()
    context.stroke()
  }
  // TODO
  // o.traverseLeafUnit = function(callBack) {
  //   if (!o.haveSubUnit()) {
  //     callBack(o)
  //   } else {
  //     for (var i = 0; i < o.subUnits.length; ++i) {
  //       var u = o.subUnits[i]
  //       u.traverseLeafUnit(callBack)
  //     }
  //   }
  // }
  o.init = function (weekCount, dayCount, dayHeight, dayWidth) {
    var gap = 10
    for (var i = 0; i < weekCount; ++i) {
      var weekY = i * (dayHeight + gap) + o.startY
      var weekWidth = dayCount * dayWidth
      var weekView = ViewUnit(o.startX, weekY, weekWidth, dayHeight)

      for (var j = 0; j < dayCount; ++j) {
        var dayX = j * dayWidth + o.startX
        var dayView = ViewUnit(dayX, weekY, dayWidth, dayHeight)
        weekView.addSubUnit(dayView)
      }

      o.addSubUnit(weekView)
    }

    view = o.subUnits
  }

  o.currentDayCount = function() {
    return o.subUnits[0].subUnits.length
  }

  o.addWeek = function () {
    // 下面这个 subUnit 的读取已经不止一次的错了，想个办法
    var dayCount = o.subUnits[0].subUnits.length
    var day = o.subUnits[0].subUnits[0]
    var dayHeight = day.height
    var dayWidth = day.width

    var gap = 10
    var weekIndex = o.subUnits.length;
    for (var i = weekIndex; i < weekIndex + 1; ++i) {
      var weekY = i * (dayHeight + gap) + o.startY
      var weekWidth = dayCount * dayWidth
      var weekView = ViewUnit(o.startX, weekY, weekWidth, dayHeight)

      for (var j = 0; j < dayCount; ++j) {
        var dayX = j * dayWidth + o.startX
        var dayView = ViewUnit(dayX, weekY, dayWidth, dayHeight)
        weekView.addSubUnit(dayView)
      }

      o.addSubUnit(weekView)
    }
  }

  o.delWeek = function () {
    o.subUnits.pop()
  }

  o.addDay = function () {
    o.subUnits.forEach(week => {
      var weekY = week.startY
      day = week.subUnits[0]
      j = week.subUnits.length
      var dayWidth = day.width
      dayX = j * dayWidth + week.startX
      var dayHeight = day.height

      var dayView = ViewUnit(dayX, weekY, dayWidth, dayHeight)
      week.subUnits.push(dayView)
    })
  }

  o.delDay = function() {
    o.subUnits.forEach(week => {
      week.subUnits.pop()
    })
  }

  o.addSubUnit = function (unit) {
    o.subUnits.push(unit)
  }

  o.haveSubUnit = function () {
    return o.subUnits.length > 0
  }

  o.contain = function (pointX, pointY) {
    if (pointX > o.startX && pointX < o.startX + o.width) {
      if (pointY > o.startY && pointY < o.startY + o.height) {
        return true
      }
    }

    return false
  }

  o.draw = function (context, timeDatasQueryerCurry) {
    var x = o.startX
    var y = o.startY
    var width = o.width
    var height = o.height
    if (o.drawOrNot && !o.haveSubUnit()) {
      context.strokeRect(x, y, width, height)
    }

    // draw timeData
    if (Array.isArray(timeDatasQueryerCurry)) {
      var timeDatas = timeDatasQueryerCurry
      timeDatas.forEach(time => {
        // log('Time show:', time)
        context.fillStyle = time[2]
        context.fillRect(x, y + (time[0] * height), width, time[1] * height)
      })
    }

    // log('Sub view unit count: ', o.subUnits.length)
    o.subUnits.forEach((e, i) => {
      e.draw(context, timeDatasQueryerCurry(i))
    })
  }

  // [iWeek, iDay, viewUnit]
  o.trySelectUnit = function (context, x, y, color) {
    // if (o.contain(x, y)) {
      if (o.haveSubUnit()) {
        // o.selected = true // 这里不能利用这个判断是否显示，需要读数据决定
        // o.color = color
        // log('Select one: ', o)
        // return [o]
        // }

        // log('SubUnit: ', o.subUnits)
        for (var i = 0; i < o.subUnits.length; ++i) {
          var u = o.subUnits[i]
          var select = u.trySelectUnit(context, x, y, color)
          if (select) {
            // log('select: ', select)
            select.unshift(i)
            return select
          }
        }
      } else if (o.contain(x, y)){
        return [o]
      }
    // }

    return null
  }

  o.mouseMove = function (context, week, day, startDecimal, lenDecimal, color) {
    var w = o.subUnits[week]
    var d = w.subUnits[day]
    var x = d.startX
    var y = d.startY
    var height = d.height
    var width = d.width
    context.fillStyle = color
    context.fillRect(x, y + (startDecimal * height), width, lenDecimal * height)
  }

  o.clear = function () {
    if (o.haveSubUnit()) {
      o.subUnits.forEach(e => {
        e.clear()
      })
    } else {
      o.selected = false
      o.color = null
    }
  }

  o.calStartDecimal = function (y) {
    return (y - o.startY) / o.height
  }

  return o
}
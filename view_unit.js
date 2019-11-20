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

   var drawLine = function(context, x, y) {
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
  o.init = function(weekCount, dayCount, dayHeight, dayWidth) {
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

  o.draw = function(context, timeDatasQueryerCurry) {
    if (o.drawOrNot) {
      var x = o.startX
      var y = o.startY
      var width = o.width
      var height = o.height
      context.strokeRect(x, y, width, height)

      // draw timeData
      if (Array.isArray(timeDatasQueryerCurry)) {
        var timeDatas = timeDatasQueryerCurry
        if (timeDatas.length == 0) {
          return
        }

        timeDatas.forEach(time => {
          // log('Time show:', time)
          context.fillStyle = 'rgb(124,167,1)' // TODO color will same, fix this bug
          context.fillRect(x, y + (time[0] * height), width, time[1] * height)
        })

      }
    }

    o.subUnits.forEach((e, i) => {
      e.draw(context, timeDatasQueryerCurry(i))
    })
  }

  // [iWeek, iDay, viewUnit]
  o.trySelectUnit = function(context, x, y, color) {
    if (o.contain(x, y)) {
      if (!o.haveSubUnit()) {
        // drawLine(context, x, y)
        o.selected = true // 这里不能利用这个判断是否显示，需要读数据决定
        o.color = color
        // log('Select one: ', o)
        return [o]
      }

      for (var i = 0; i < o.subUnits.length; ++i) {
        var u = o.subUnits[i]
        var select = u.trySelectUnit(context, x, y, color)
        if (select) {
          // log('select: ', select)
          select.unshift(i)
          return select
        }
      }
    }

    return null
  }

  o.mouseMove = function(context, x, y, color) {
    if (o.contain(x, y)) {
      if (!o.haveSubUnit()) {
        // TODO modify
        drawLine(context, x, y)
        return
      } else {
        for (var i = 0; i < o.subUnits.length; ++i) {
          var u = o.subUnits[i]
          u.mouseMove(context, x, y, color)
        }
      }
    }
  }

  o.clear = function() {
    if (o.haveSubUnit()) {
      o.subUnits.forEach(e => {
        e.clear()
      })
    } else {
      o.selected = false
      o.color = null
    }
  }

  o.calStartDecimal = function(y) {
    log('view y: ', y)
    log('o y: ', o.startY)
    log('o y: ', o.height)

    return (y - o.startY) / o.height
  }

  return o
}
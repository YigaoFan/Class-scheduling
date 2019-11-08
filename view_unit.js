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

  o.draw = function(context, timeData) {
    if (o.drawOrNot) {
      var x = o.startX
      var y = o.startY
      var width = o.width
      var height = o.height
      context.strokeRect(x, y, width, height)

      if (o.selected) {
        context.fillStyle = o.color
        context.fillRect(x, y, width, height)
      }
      // draw timeData
    }

    o.subUnits.forEach(e => {
      e.draw(context)
    })
  }

  // [iWeek, iDay, viewUnit]
  o.trySelectUnit = function(x, y, color) {
    if (o.contain(x, y)) {
      if (!o.haveSubUnit()) {
        o.selected = true // 这里不能利用这个判断是否显示，需要读数据决定
        o.color = color
        return [o]
      }

      for (var i = 0; i < o.subUnits.length; ++i) {
        var u = o.subUnits[i]
        var select = u.trySelectUnit(x, y)
        if (select) {
          return select.unshift(i)
        }
      }
    }

    return null
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

  o.calStartDecimal = function(viewUnit) {
    return (viewUnit.startX - o.startX) / o.height
  }

  return o
}
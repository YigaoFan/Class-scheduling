// TODO: 应该将这个 rectangle 按照半小时的（可修改）粒度分成一块一块的，这样人家才好点
// TODO: two mode, click range bound mode and choose range mode
// TODO: dynamic change canvas width and height
// TODO:
// TODO: week compare
// TODO: can configure excel file parse format
var Screen = function(mouse, timeUnit) {
  var canvas = document.getElementById('id-canvas')
  var context = canvas.getContext('2d')
  // Left-top start point
  var point = [10, 10]
  // Day rect related
  var Width = 30
  var Height = 150
  var _weekCount = 2
  var dayCount = 1
  var unitCount = function() {
    return 24 / timeUnit[0]
  }
  var unitHeight = function() {
    return Height / unitCount()
  }
  var haveCompared = false

  var o = {}
  var clickedUnits = []

  var genColor = function() {
    var genColorBit = function() {
      return parseInt(Math.random() * 255)
    }
    return 'rgb(' + genColorBit() + ',' + genColorBit() + ',' + genColorBit() + ')'
  }

  var currentColor = genColor()

  var changeColor = function() {
    currentColor = genColor()
  }

  var drawRect = function(x, y) {
    context.strokeRect(x, y, Width, Height)
  }

  var drawBlock = function(x, y, color) {
    context.fillStyle = color
    context.fillRect(x, y, Width, unitHeight())
  }

  var drawLine = function(x, y) {
    context.beginPath()
    context.moveTo(x, y)
    context.lineTo(x + Width, y)
    context.closePath()
    context.stroke()
  }

  var pointInRect = function(pointX, pointY, rectX, rectY) {
    if (pointX >= rectX && pointX <= (rectX + Width)) {
      if (pointY >= rectY && pointY <= (rectY + Height)) {
        return true
      }
    }

    return false
  }

  var pointInTimeUnit = function(pointX, pointY, unitX, unitY) {
    if (pointX >= unitX && pointX <= (unitX + Width)) {
      if (pointY >= unitY && pointY <= (unitY + unitHeight())) {
        return true
      }
    }

    return false
  }

  var deleteUnitByX = function(x) {
    for (var i = 0; i < clickedUnits.length; i++) {
      var pointX = clickedUnits[i][0]
      if (x == pointX) {
        clickedUnits.splice(i, 1)
        deleteUnitByX(x)
        break // Why here don't have break, it also work normal
      }
    }
  }

  var drawBackground = function() {

  }

  var traverseRects = function(callBack, weekCount = _weekCount) {
    for (var c = weekCount - 1; c >= 0; c--) {
      var offset = c * (Height + 10)
      for (var i = dayCount - 1; i >= 0; i--) {
        var rectX = point[0] + i * Width
        var rectY = point[0] + offset
        callBack(rectX, rectY, c)
      }
    }
  }

  var makeUnitIter = function(callBack) {
    var count = unitCount()
    var height = unitHeight()
    var traverseUnit = function(rectX, rectY, weekIndex) {
      for (var i = count; i >= 0; i--) {
        var unitX = rectX
        var unitY = rectY + i * height
        callBack(unitX, unitY, weekIndex)
      }
    }

    return traverseUnit
  }

  var traverseTimeUnit = function(callBack) {
    traverseRects(makeUnitIter(callBack))
  }

  o.tryAddUnit = function(x, y) {
    var addIfIn = function(unitX, unitY, weekIndex) {
      if (pointInTimeUnit(x, y, unitX, unitY)) {
        clickedUnits.push([
          unitX,
          unitY,
          currentColor,
          weekIndex,
        ])

        changeColor()
      }
    }

    traverseTimeUnit(addIfIn)
  }

  o.addDay = function() {
    ++dayCount
  }

  o.delDay = function() {
    deleteUnitByX(point[0] + Width * (dayCount - 1))
    dayCount = dayCount - 1
  }

  o.draw = function() {
    for (var i = 0; i < clickedUnits.length; i++) {
      drawBlock(clickedUnits[i][0], clickedUnits[i][1], clickedUnits[i][2])
      // TODO: should click color block, not draw block
    }

    var x = mouse[0]
    var y = mouse[1]
    var dayHelper = function(rectX, rectY, weekIndex) {
      drawRect(rectX, rectY)
      makeUnitIter(function(unitX, unitY) {
        if (pointInTimeUnit(x, y, unitX, unitY)) {
          drawBlock(unitX, unitY, currentColor)
        }
      })(rectX, rectY)
    }

    traverseRects(dayHelper)
  }

  o.clear = function() {
    context.clearRect(0, 0, canvas.width, canvas.height)
  }

  o.addWeek = function() {
    ++_weekCount
  }

  o.delWeek = function() {
    --_weekCount
    var helper = function() {
      for (var i = 0; i < clickedUnits.length; i++) {
        var shouldExist = false
        var x = clickedUnits[i][0]
        var y = clickedUnits[i][1]
        traverseRects(function(rectX, rectY, weekIndex) {
          if (pointInRect(x, y, rectX, rectY)) {
            shouldExist = true
          }
        })

        if (!shouldExist) {
          clickedUnits.splice(i, 1)
          helper()
          break
        }
      }
    }

    helper()
  }

  o.clearClickRecord = function() {
    clickedUnits.length = 0
  }

  o.showSameTimeOfExistedWeek = function() {
    log('have comapared: ' + haveCompared)
    if (haveCompared) {
      // 删掉上次比较的结果
      o.delWeek()
    }
    haveCompared = true

    var getUnitsWithoutOffsetFromWeek = function(weekIndex) {
      // remember to remove Y offset
      var removeOffsetY = function(unit, weekIndex) {
        var offsetY = weekIndex * (Height + 10)
        return [
          unit[0],
          unit[1] - offsetY,
        ]
      }
      var units = []
      for (var i = 0; i < clickedUnits.length; ++i) {
        var u = clickedUnits[i]
        if (u[3] == weekIndex) {
          units.push(removeOffsetY(u, weekIndex))
        }
      }

      return units
    }
    var unitInUnits = function(unit, units) {
      for (var i = 0; i < units.length; ++i) {
        if (unit[0] == units[i][0] && unit[1] == units[i][1]) {
          return true
        }
      }

      return false
    }
    var compareWeekSameUnits = function(units1, units2) {
      if (units1.length == 0) {
        return units2
      }

      var _compareWeekSameUnits = function(units1, units2) {
        var sameUnits = []
        for (var i = 0; i < units1.length; ++i) {
          var u = units1[i]
          if (unitInUnits(u, units2)) {
            sameUnits.push(u)
          }
        }
        return sameUnits
      }

      return units1.length < units2.length ? _compareWeekSameUnits(units1, units2) : _compareWeekSameUnits(units2, units1)
    }
    var sameTimeUnitsInWeekLevel = []
    for (var i = 0; i < _weekCount; i++) {
      // 注意：这里的 sameTimeUnits 可能会有类似引用的坑
      sameTimeUnitsInWeekLevel = compareWeekSameUnits(sameTimeUnitsInWeekLevel, getUnitsWithoutOffsetFromWeek(i))
    }
    var addIntoClickedUnits = function(sameUnitsWithoutOffset) {
      o.addWeek()
      var weekIndex = _weekCount - 1
      var offsetY = weekIndex * (Height + 10)
      for (var i = 0; i < sameUnitsWithoutOffset.length; i++) {
        var u = sameUnitsWithoutOffset[i]
        var unit = [
          u[0],
          u[1] + offsetY,
          currentColor,
          weekIndex,
        ]
        clickedUnits.push(unit)
        changeColor()
      }
    }
    addIntoClickedUnits(sameTimeUnitsInWeekLevel)
  }

  return o
}
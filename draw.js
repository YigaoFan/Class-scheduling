// TODO: 应该将这个 rectangle 按照半小时的（可修改）粒度分成一块一块的，这样人家才好点
// RGB background
// TODO: two mode, click range bound mode and choose range mode
// TODO: How draw color block in rect
// TODO: dynamic change canvas width and height
// TODO: 加一个生成当前时间并加一定时间的功能
// TODO: 随机生成鼠标划过的颜色，点击之后确认
var Screen = function(mouse, timeUnit) {
  var static = Screen
  // Start point
  var point = [10, 10]
  // Rect related
  var Width = 30
  var Height = 150
  var weekCount = 1
  var dayCount = 1
  var unitHeight = function() {
    return Height / unitCount()
  }

  var unitCount = function() {
    return 24 / timeUnit[0]
  }
  var canvas = document.getElementById('id-canvas')
  var context = canvas.getContext('2d')

  var o = {}
  // var handleRecord = 0
  var lines = []

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

  // var genHandle = function() {
  //   handleRecord = handleRecord + 1
  //   return handleRecord
  // }

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

  var deleteRelatedLineFromX = function(x) {
    for (var i = 0; i < lines.length; i++) {
      var pointX = lines[i][0]
      if (x == pointX) {
        lines.splice(i, 1)
        // Continue search
        deleteRelatedLineFromX(x)
        break // Why here don't have break, it also work normal
      }
    }
  }

  var drawBackground = function() {

  }

  var traverseRects = function(fun) {
    for (var c = weekCount - 1; c >= 0; c--) {
      var offset = c * (Height + 10)
      for (var i = dayCount - 1; i >= 0; i--) {
        // log(offset)
        var rectX = point[0] + i * Width
        var rectY = point[0] + offset
        fun(rectX, rectY)
      }
    }
  }


  var traverseTimeUnitBlock = function(fun) {
    var genUnit = function(rectX, rectY) {
      // TODO 可以设置每天的可用时间
      var count = unitCount()
      var height = unitHeight()

      for (var i = count; i >= 0; i--) {
        var unitX = rectX
        var unitY = rectY + i * height
        fun(unitX, unitY)
      }
    }

    traverseRects(genUnit)
  }

  o.tryAddLine = function(x, y) {
    var checkAdd = function(unitX, unitY) {
      if (pointInTimeUnit(x, y, unitX, unitY)) {
        // log('pushed: ' + x + ' ' + y)
        lines.push([
          unitX,
          unitY,
          currentColor,
        ])

        changeColor()
      }
    }

    traverseTimeUnitBlock(checkAdd)
  }

  o.addRect = function() {
    ++dayCount
  }

  o.deleteRect = function(handle = -1) {
    // log('delete called: ' + handle)
    deleteRelatedLineFromX(point[0] + Width * (dayCount - 1))
    dayCount = dayCount - 1
  }

  o.draw = function() {
    for (var i = 0; i < lines.length; i++) {
      // TODO 为什么移动和点击的位置不一致
      drawBlock(lines[i][0], lines[i][1], lines[i][2])
      // TODO: should click color block, not draw block
    }

    var x = mouse[0]
    var y = mouse[1]

    var dayHelper = function(rectX, rectY) {
      drawRect(rectX, rectY)

      var genUnit = function(fun) {
        // TODO 可以设置每天的可用时间
        var count = unitCount()
        var height = unitHeight()

        for (var i = count; i >= 0; i--) {
          var unitX = rectX
          var unitY = rectY + i * height
          fun(unitX, unitY)
        }
      }

      var timeUnitHelper = function(unitX, unitY) {
        if (pointInTimeUnit(x, y, unitX, unitY)) {
          drawBlock(unitX, unitY, currentColor)
        }
      }

      genUnit(timeUnitHelper)
      // TODO: Draw background
    }

    traverseRects(dayHelper)
  }

  o.clear = function() {
    context.clearRect(0, 0, canvas.width, canvas.height)
  }

  o.addWeek = function() {
    ++weekCount
  }

  o.delWeek = function() {
    --weekCount
    var helper = function() {
      for (var i = 0; i < lines.length; i++) {
        var shouldExist = false
        var x = lines[i][0]
        var y = lines[i][1]
        traverseRects(function(rectX, rectY) {
          if (pointInRect(x, y, rectX, rectY)) {
            shouldExist = true
          }
        })

        if (!shouldExist) {
          lines.splice(i, 1)
          helper()
          break
        }
      }
    }

    helper()
  }

  o.clearClickRecord = function() {
    lines.length = 0
  }

  // Defalut perform action
  o.addWeek()
  return o
}
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
  var Height = 100
  var weekCount = 1
  var dayCount = 1

  var canvas = document.getElementById('id-canvas')
  var context = canvas.getContext('2d')

  var o = {}
  var handleRecord = 0
  var lines = []

  var genHandle = function() {
    handleRecord = handleRecord + 1
    return handleRecord
  }

  var drawRect = function(x, y) {
    context.strokeRect(x, y, Width, Height)
  }

  var drawBlock = function(x, y) {
    context.fillRect(x, y, Width, 6)
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
      var unitCount = 24 / timeUnit
      var unitHeight = Height / unitCount

      for (var i = unitCount; i >= 0; i--) {
	var unitX = rectX
	var unitY = rectY + i * unitHeight

	fun(unitX, unitY, unitHeigh)
      }
      
    }
  } 

  o.tryAddLine = function(x, y) {
    var checkAdd = function(rectX, rectY) {
      if (pointInRect(x, y, rectX, rectY)) {
        // log('pushed: ' + x + ' ' + y)
        lines.push([
          rectX,
          y,
        ])
      }
    }

    traverseRects(checkAdd)
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
      drawBlock(lines[i][0], lines[i][1] - 3)
      // TODO: should click color block, not draw block
    }

    var x = mouse[0]
    var y = mouse[1]

    var helper = function(rectX, rectY) {
      drawRect(rectX, rectY)

      if (pointInRect(x, y, rectX, rectY)) {
        // drawLine(rectX, y)
        drawBlock(rectX, y - 3)
      }

      // TODO: Draw background
    }

    traverseRects(helper)
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

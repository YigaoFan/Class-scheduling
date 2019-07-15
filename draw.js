// TODO: 应该将这个 rectangle 按照半小时的（可修改）粒度分成一块一块的，这样人家才好点
// RGB background
// use x as handle?


var Screen = function(mouse) {
  var static = Screen
  // Start point
  var point = [10, 10]
  // Rect related
  var Width = 30
  var Height = 100
  var weekCount = 1

  var canvas = document.getElementById('id-canvas')
  var context = canvas.getContext('2d')

  var o = {}
  var handleRecord = 0
  var rectList = []
  var lines = []

  var genHandle = function() {
    handleRecord = handleRecord + 1
    return handleRecord
  }

  var registerInRectList = function(shape) {
    var o = {
      shape: shape,
      handle: genHandle(),
    }

    rectList.push(o)

    return o.handle
  }

  var drawRect = function(x, y) {
    context.strokeRect(x, y, Width, Height)
  }

  var drawLine = function(x, y) {
    context.beginPath()
    context.moveTo(x, y)
    context.lineTo(x + Width, y)
    context.closePath()
    context.stroke()
  }

  var indexOf = function(handle) {
    for (var i = 0; i < rectList.length; i++) {
      if (rectList[i].handle == handle) {
        return i
      }
    }
    throw {
      Error: "Can 't not find corresponding shape of handle: " + handle
    }
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
      var offset = c * Height
      for (var i = rectList.length - 1; i >= 0; i--) {
        var rectX = rectList[i].shape[0]
        var rectY = rectList[i].shape[1] + offset
        fun(rectX, rectY)
      }
    }
  }

  // TODO: use traverseRects to refactor
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

    // Gen handle to delete function
  }

  o.addRect = function() {
    var x = point[0]
    var y = point[1]

    var rect = [
      x,
      y,
    ]

    // Update point
    point[0] += Width
    return registerInRectList(rect)
  }

  // TODO: just use x of point to delete
  o.deleteRect = function(handle = -1) {
    log('delete called: ' + handle)
    if (handle == -1) {
      var r = rectList.pop()
      deleteRelatedLineFromX(r.shape[0])

      // Update point
      point[0] -= Width
    } else {
      var i = indexOf(handle)
      var discardedOnes = rectList.splice(i, 1)
      var discardedOne = discardedOnes[0]
      deleteRelatedLineFromX(discardedOne.shape[0])
    }
  }

  o.draw = function() {
    for (var i = 0; i < lines.length; i++) {
      drawLine(lines[i][0], lines[i][1])
    }

    var x = mouse[0]
    var y = mouse[1]

    var helper = function(rectX, rectY) {
      drawRect(rectX, rectY)

      if (pointInRect(x, y, rectX, rectY)) {
        drawLine(rectX, y)
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
  o.addRect()
  o.addWeek()
  return o
}
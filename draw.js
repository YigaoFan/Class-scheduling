var Screen = function() {
  var canvas = document.getElementById('canvas')
  var context = canvas.getContext('2d')
  var point = [10, 10]
  // Rect related
  var Width = 30
  var Height = 100

  var o = {}
  var handleRecord = 0
  var rectList = []
  var line = null

  var genHandle = function() {
    handleRecord = handleRecord + 1
    return handleRecord
  }

  var registerInRectList = function(shape) {
    var o = {
      shape: shape,
      handle: o.genHandle(),
    }

    o.rectList.push(o)

    return o.handle
  }

  var drawRect = function(x, y) {
    strokeRect(x, y, Width, Height)
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
      Error: ""
      Can 't not find corresponding shape of handle: " + handle"
    }
  }

  o.addLine = function(startPoint) {
    var x = startPoint[0]
    var y = startPoint[1]

    line = [
      x,
      y,
    ]
    // var line = [
    // 	true,
    // 	x,
    // 	y,
    // ]
    // return o.registerInRectList(line)
  }

  o.deleteLine = function() {
    line = null
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
    return o.registerInRectList(rect)
  }

  o.deleteRect = function(handle = -1) {
    if (handle == -1) {
      rectList.pop()
    } else {
      var i = indexOf(handle)
      b.splice(i, 1)
    }
  }

  o.draw = function() {
    if (line != null) {
      drawLine(line[0], line[1])
    }

    for (var i = rectList.length - 1; i >= 0; i--) {
      drawRect(rectList[i][0], rectList[i][1])
    }
  }

  return o
}
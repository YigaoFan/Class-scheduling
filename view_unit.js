var ViewUnit = function (startPointX, startPointY, width, height, drawOrNot = true) {
  var o = {
    drawOrNot: drawOrNot,
    startPointX: startPointX,
    startPointY: startPointY,
    width: width,
    height: height,
    subUnits: [],
  }

  o.addSubUnit = function (unit) {
    o.subUnits.push(unit)
  }

  o.haveSubUnit = function () {
    return o.subUnits.length > 0
  }

  o.in = function (pointX, pointY) {
    if (pointX > o.startPointX && pointX < o.startPointX + o.width) {
      if (pointY > o.startPointY && pointY < o.startPointY + o.height) {
        return true
      }
    }

    return false
  }

  o.draw = function(context) {
    if (o.drawOrNot) {
      context.strokeRect(x, y, Width, Height)
    }

    o.subUnits.forEach(e => {
      e.draw()
    })
  }

  return o
}
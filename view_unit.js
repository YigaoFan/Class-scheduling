var ViewUnit = function (startPointX, startPointY, width, height, drawOrNot = true) {
  var o = {
    drawOrNot: drawOrNot,
    startPointX: startPointX,
    startPointY: startPointY,
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

  o.addSubUnit = function (unit) {
    o.subUnits.push(unit)
  }

  o.haveSubUnit = function () {
    return o.subUnits.length > 0
  }

  o.contain = function (pointX, pointY) {
    if (pointX > o.startPointX && pointX < o.startPointX + o.width) {
      if (pointY > o.startPointY && pointY < o.startPointY + o.height) {
        return true
      }
    }

    return false
  }

  o.draw = function(context) {
    if (o.drawOrNot) {
      var x = o.startPointX
      var y = o.startPointY
      var width = o.width
      var height = o.height
      context.strokeRect(x, y, width, height)

      if (o.selected) {
        context.fillStyle = o.color
        context.fillRect(x, y, width, height)
      }
    }

    o.subUnits.forEach(e => {
      e.draw()
    })
  }

  o.trySelectUnit = function(x, y, color) {
    if (o.contain(x, y)) {
      if (!o.haveSubUnit()) {
        o.selected = true
        o.color = color
        return o
      }

      for (var i = 0; i < o.subUnits.length; ++i) {
        var u = o.subUnits[i]
        var select = u.trySelectUnit(x, y)
        if (select == null) {
          continue
        }

        return select
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

  return o
}
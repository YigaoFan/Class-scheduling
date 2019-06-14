var Screen = function() {
  var o = {}

  var canvas = document.querySelector('#id-canvas')
  var context = canvas.getContext('2d')
  o.canvas = canvas
  o.context = context

  o.clear = function() {
    context.clearRect(0, 0, canvas.width, canvas.height)
  }

  setInterval(function() {
    o.clear()
    o.draw()
  }, 1000 / 40)

  return o
}

var Days = function() {
  var o = {
    days: [],
  }

  // Register mouse and button click listener here?

  o.draw = function() {
    for (var d in o.days) {
      // Draw each day
    }
    // Draw mouse position
  }
}
var __main = function() {
  var days = Days()
  var s = Screen()
  s.draw = function() {
    days.draw()
  }
}

__main()
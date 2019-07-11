var __main = function() {
  var Mouse = []
  var screen = Screen(Mouse)
  document.querySelector('#id-add-day').addEventListener('click', function(event) {
    screen.addRect()
  })

  document.querySelector('#id-del-day').addEventListener('click', function(event) {
    screen.deleteRect()
  })

  window.addEventListener('mousemove', function(event) {
    // 6 为手动校准量
    var x = event.clientX - 6
    var y = event.clientY - 6
    Mouse[0] = x
    Mouse[1] = y
  })

  window.addEventListener('mousedown', function(event) {
    // 6 为手动校准量
    var x = event.clientX - 6
    var y = event.clientY - 6
    screen.tryAddLine(x, y)

  })
  setInterval(function() {
    // this will make line be grey not black
    screen.clear()
    screen.draw()
  }, 1000 / 30)
}

__main()
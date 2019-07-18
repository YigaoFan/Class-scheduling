var __main = function() {
  var Mouse = []
  var timeUnit = [4, ]
  document.querySelector('#id-input-speed').addEventListener('input', function() {
    var input = event.target
    // 0.5 1 1.5 2 3 4 min max
    // Value transform to time
    timeUnit[0] = Number(input.value) + 1
  })
  var screenPart = Screen(Mouse, timeUnit)

  document.querySelector('#id-add-week').addEventListener('click', function(event) {
    screenPart.addWeek()
  })

  document.querySelector('#id-del-week').addEventListener('click', function(event) {
    screenPart.delWeek()
  })

  document.querySelector('#id-add-day').addEventListener('click', function(event) {
    screenPart.addRect()
  })

  document.querySelector('#id-del-day').addEventListener('click', function(event) {
    screenPart.deleteRect()
  })

  document.querySelector('#id-clear-record').addEventListener('click', function(event) {
    screenPart.clearClickRecord()
  })
  window.addEventListener('mousemove', function(event) {
    // 6 为手动校准量
    var x = event.pageX - 6
    var y = event.pageY - 6
    Mouse[0] = x
    Mouse[1] = y
  })

  window.addEventListener('mousedown', function(event) {
    // 6 为手动校准量
    var x = event.pageX - 6
    var y = event.pageY - 6
    screenPart.tryAddLine(x, y)
    // log('clientX: ' + x)
    // log('clientY: ' + y)
    // log('pageX: ' + event.pageX)
    // log('pageY: ' + event.pageY)
  })
  setInterval(function() {
    // this will make line be grey not black
    screenPart.clear()
    screenPart.draw()
  }, 1000 / 30)
}

__main()
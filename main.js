var __main = function() {
  var Mouse = [] // TODO 这个应该废弃
  var timeUnit = [4, ]
  var screenPart = Screen(Mouse, timeUnit)

  registerElementEventHandler('#id-input-speed', function() {
    var input = event.target
    // 0.5 1 1.5 2 3 4 min max
    // Value transform to time
    timeUnit[0] = Number(input.value) + 1
  }, 'input')
  registerElementEventHandler('#id-add-week', screenPart.addWeek)
  registerElementEventHandler('#id-del-week', screenPart.delWeek)
  registerElementEventHandler('#id-add-day', screenPart.addDay)
  registerElementEventHandler('#id-del-day', screenPart.delDay)
  registerElementEventHandler('#id-clear-record', screenPart.clearClickRecord)
  registerElementEventHandler('#id-compare-time', screenPart.showSameTimeOfExistedWeek)
  window.addEventListener('mousemove', function(event) {
    // 6 为手动校准量
    var x = event.pageX - 6
    var y = event.pageY - 6
    Mouse[0] = x
    Mouse[1] = y
    // 这里触发事件
  })
  window.addEventListener('mousedown', function(event) {
    // 6 为手动校准量
    var x = event.pageX - 6
    var y = event.pageY - 6
    screenPart.tryAddUnit(x, y)
  })

  var uploadFileButton = document.getElementById("file")
  uploadFileButton.addEventListener('change', attachFileHandler, false)

  var debug = false
  if (debug) {
    var canvas = document.getElementById('id-canvas')
    var d = Dashboard(canvas)
    d.init(2, 7)
  } else {
    // Refresh
    setInterval(function () {
      // this will make line be grey not black
      screenPart.clear()
      screenPart.draw()
    }, 1000 / 30)
  }
}

__main()
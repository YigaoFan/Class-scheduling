var __main = function() {
  var canvas = document.getElementById('id-canvas-0')
  var d = Dashboard(canvas)
  d.init(2, 7)

  registerElementEventHandler('#id-input-speed', function() {
    var input = event.target
    // 0.5 1 1.5 2 3 4 min max
    // Value transform to time
    // timeUnit[0] = Number(input.value) + 1
  }, 'input')
  registerElementEventHandler('#id-add-week', d.addWeek)
  registerElementEventHandler('#id-del-week', d.delWeek)
  registerElementEventHandler('#id-add-day', d.addDay)
  registerElementEventHandler('#id-del-day', d.delDay)
  registerElementEventHandler('#id-clear-record', d.clearClickedTime)
  // registerElementEventHandler('#id-compare-time', screenPart.showSameTimeOfExistedWeek)
  window.addEventListener('mousemove', function(event) {
    // 6 和 7 为手动校准量
    var x = event.pageX - 6
    var y = event.pageY - 7
    d.mouseMove(x, y)
  })
  window.addEventListener('mousedown', function(event) {
    // 6 和 7 为手动校准量
    var x = event.pageX - 6
    var y = event.pageY - 7
    // screenPart.tryAddUnit(x, y)
    d.tryAddTimeUnit(x, y)
  })

  var uploadFileButton = document.getElementById("file")
  uploadFileButton.addEventListener('change', attachFileHandler, false)
}

__main()
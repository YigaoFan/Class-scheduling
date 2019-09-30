var __main = function() {
  var Mouse = []
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
  })
  window.addEventListener('mousedown', function(event) {
    // 6 为手动校准量
    var x = event.pageX - 6
    var y = event.pageY - 6
    screenPart.tryAddUnit(x, y)
  })

  var processWorkBook = function(wb) {
    var ws = wb.Sheets[wb.SheetNames[0]]
    var html_string = XLSX.utils.sheet_to_html(ws, {
      id: "data-table",
      editable: true
    })
    // document.getElementById("container").innerHTML = html_string
    log('load file OK')
  }

  var uploadFileButton = document.getElementById("file")
  var attachFileHandler = function(event) {
    var files = event.target.files
    var f = files[0]
    var reader = new FileReader()
    var rABS = !!reader.readAsBinaryString
    reader.onload = function(e) {
      var data = event.target.result
      if (!rABS) {
        data = new Uint8Array(data)
      }
      var wb = XLSX.read(data, {
        type: rABS ? 'binary' : 'array'
      })
      processWorkBook(wb)
    }
    if (rABS) {
      reader.readAsBinaryString(f)
    } else {
      reader.readAsArrayBuffer(f)
    }
  }
  uploadFileButton.addEventListener('change', attachFileHandler, false)

  // Refresh
  setInterval(function() {
    // this will make line be grey not black
    screenPart.clear()
    screenPart.draw()
  }, 1000 / 30)
}

__main()
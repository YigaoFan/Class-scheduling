var processWorkBook = function(wb) {
  workbook = wb
  ws = wb.Sheets[wb.SheetNames[0]]
  var html_string = XLSX.utils.sheet_to_html(ws, {
    id: "data-table",
    editable: true
  })
  log('load file OK')
  // temp code below
  var summarySheetName = wb.SheetNames[0]
  var sheet = wb.Sheets[summarySheetName]
  // TODO h 这个是什么意思呢
  log(sheet['A1'].h)
}

var attachFileHandler = function(event) {
  var files = event.target.files
  var f = files[0]
  var reader = new FileReader()
  var rABS = typeof FileReader !== 'undefined' && FileReader.prototype && FileReader.prototype.readAsBinaryString
  reader.onload = function(e) {
    var data = e.target.result
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
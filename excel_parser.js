var processWorkBook = function(wb) {
  workbook = wb
  var ws = wb.Sheets[wb.SheetNames[0]]
  var html_string = XLSX.utils.sheet_to_html(ws, {
    id: "data-table",
    editable: true
  })
  log('load file OK')
  // temp code below
  var summarySheetName = wb.SheetNames[0]
  sheet = wb.Sheets[summarySheetName]
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

var getCell = function(column, line, sheet) {
  var dic = [
    'A',
    'B',
    // how to generate this
  ]
  return sheet[dic[column] + line.toString()]
}
var emptyCell = function(cell) {
  // TODO 测试下看这个对不对
  return cell && cell.v && cell.v.replace(/\s/g, '').length
}

var containValidTime = function(cell) {
  // TODO
}

var detectTimeTable = function(sheet) {
  var colLimit = 50
  var linLimit = 50

  var searchRightBound = function(i, line) {
    ++i
    for (; i < colLimit; ++i) {
      var c = getCell(i, line, sheet)
      if (emptyCell(c)) {
        return i
      }
    }

    throw "Right bound not found, please check sheet"
  }
  var searchDownBound = function(column, j) {
    ++j
    for (; j < linLimit; ++j) {
      var c = getCell(column, j, sheet)
      if (emptyCell(c)) {
        return j
      }
    }

    throw "Down bound not found, please check sheet"
  }
  for (var i = 0; i < colLimit; ++i) {
    for (var j = 0; j < linLimit; ++j) {
      var c = getCell(i, j, sheet)
      if (!emptyCell(c) && containValidTime(c)) {
        // 表示找到了列表的左上角
        var r = searchRightBound(i, j)
        var d = searchDownBound(i, j)
        return {
          // [column, line]
          startPoint: [i, j],
          rightBound: r,
          downBound: d,
        }
      }
    }
  }
  throw "Invalid sheet, please check sheet"
}

var parseTimeCell = function(cell) {
  // 解析一个单元格中的数据（有一定的宽容度）
}
// 期望列表的输入是方的
// 输出一个时间列表，外面可以利用这个时间表去生成一个周
var parseSheet = function(sheet) {
  var times = []
  var table = detectTimeTable(sheet)
  var startPoint = table.startPoint
  var i = table.startPoint[0] // column
  var j = table.startPoint[1] // line
  for (; i < table.rightBound; ++i) {
    for (; j < table.downBound; ++j) {
      var c = getCell(i, j, sheet)
      var t = parseTimeCell(c)
      times.push(t)
    }
  }

  return times
}
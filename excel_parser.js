/*
可以加一个将解析出来的时间信息以网格的形式显示出来，供用户去微调时间？
*/
var processWorkBook = function(wb) {
  workbook = wb
  var html_string = XLSX.utils.sheet_to_html(ws, {
    id: "data-table",
    editable: true
  })
  log('load file OK')
  // default parse first sheet
  var first = wb.SheetNames[0]
  sheet = wb.Sheets[first]
  var times = parseSheet(sheet)
  // show times
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
  var c = String.fromCharCode(65 + column)
  var cell = sheet[c + line.toString()]
  log(column, line, ' content: ', cell)
  return cell
}
var emptyCell = function(cell) {
  return !(cell && cell.v && cell.w.replace(/\s/g, '').length)
}
var containValidTime = function(cell) {
  // TODO
  return true
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
  for (var k in sheet) {
    // TODO 采用遍历的模式而不是现在这种类似穷举的方法
    // 过滤掉无用的 k -- !ref !margins
    if (!k.includes('!')) {
      log(sheet[k].w)
    }
  }
  return;
  for (var i = 0; i < colLimit; ++i) {
    for (var j = 1; j < linLimit; ++j) {
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
var isSpace = function(c) {
  return c && !c.trim()
}
var isNum = function(c) {
  return '0123456789'.includes(c)
}
var isDiv = function(c) {
  return c == ':'
}
var parseTime = function(str) {
  // 注意下面：有几个状态是不相容的
  var onTimeParse = false
  var expectHour = true
  var expectMin = false
  var expectDivide = false // like : or other divide char
  var expectSpace = true
  var hour = ''
  var min = ''
  for (var i = 0; i < str.length; ++i) {
    var c = str[i]

    log('now: ', c)
    log('hour: ', hour)
    log('min: ', min)
    log('expectHourBegin: ', expectHourBegin)
    log('expectMinBegin: ', expectMinBegin)
    log('expectDivide: ', expectDivide)
    log('expectSpace: ', expectSpace)
    // 主动将 expectSpace 设为 true 的情况只有一种：即两个时间的分隔
    // expect 用于表达语法的主动倾向，而非下一个地方的可能性
    // 可能性利用 && 右边的式子进行处理
    // 还没有思考完全
    if (expectSpace && isSpace(c)) {
      // nothing to do
    } else if (expectSpace && isNum(c)) {
      expectHour = true
      expectSpace = false
    } else if (expectHour && isNum(c)) {
      hour += c
    } else if (expectHour && isSpace(c)) {
      expectHour = false
      expectDivide = true
    } else if (expectHour && isDiv(c)) {
      expectHour = false
      expectMin = true
    } else if (expectDivide && isDiv(c)) {
      expectDivide = false
      expectMin = true
    } else if (expectDivide && isSpace(c)) {
      // nothing to do
    } else if (expectMin && isNum(c)) {
      min += c
    } else if (expectMin && isSpace(c)) {
      // nothing to do
      // 这里怎么知道是 ：后面还是数字后面呢
      // 这里有问题
    } else if () {

    } else {
      throw "Error content" + c
    }
  }
  // convert hour and min to int and check valid or not
  log('hour: "' + hour + '" min: "' + min + '"')
}
// 期望列表的输入是方的
// 输出一个时间列表，外面可以利用这个时间表去生成一个周
var parseSheet = function(sheet) {
  var times = []
  var table = detectTimeTable(sheet)
  log(table)
  // var startPoint = table.startPoint
  // var i = table.startPoint[0] // column
  // var j = table.startPoint[1] // line
  // for (; i < table.rightBound; ++i) {
  //   for (; j < table.downBound; ++j) {
  //     var c = getCell(i, j, sheet)
  //     var t = parseTimeCell(c)
  //     times.push(t)
  //   }
  // }
  //
  // return times
}
/*
可以加一个将解析出来的时间信息以网格的形式显示出来，供用户去微调时间？
时间与时间之间有横线或其他： 10:00 - 12:00，这个需要处理一下
*/
var processWorkBook = function(wb) {
  workbook = wb
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
var containValidTime = function(str) {
  for (var i = 0; i < str.length; ++i) {
    var c = str[i]
    if (isNum(c)) { // 这里的判断条件比较简单
      return true
    }
  }

  return false
}
// [alpha, num]
var divideAlphaNum = function(str) {
  for (var i = 0; i < str.length; ++i) {
    var c = str[i]
    if (isNum(c)) {
      return [
        str.substring(0, i),
        str.substring(i),
      ]
    }
  }
}
var detectUpLeftTimeUnitPos = function(sheet) {
  for (var k in sheet) {
    if (!k.includes('!')) { // 过滤掉无用的 k -- !ref !margins
      if (containValidTime(sheet[k].w)) {
        return divideAlphaNum(k)
      }
    }
  }
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
  var times = []
  var onTimeParse = false
  var expectHour = true
  var expectMin = false
  var expectDivide = false // like : or other divide char
  var expectSpace = true
  var hour = ''
  var min = ''
  for (var i = 0; i < str.length; ++i) {
    var c = str[i]
    if (expectSpace && isSpace(c)) {
      // nothing to do
    } else if (expectSpace && isNum(c)) {
      hour += c
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
    } else if (expectMin && isSpace(c) && min.length == 0) {
      // nothing to do
    } else if (expectMin && isSpace(c) && min.length != 0) {
      expectMin = false
      expectSpace = true
      // 一个时间已经解析结束
      times.push([parseInt(hour), parseInt(min)])
      hour = ''
      min = ''
    } else {
      throw "Error content" + c
    }
  }
  if (hour != '' && min != '') {
    times.push([parseInt(hour), parseInt(min)])
  }
  // convert hour and min to int and check valid or not
  return times
}
// 期望列表的输入是方的
// 输出一个时间列表，外面可以利用这个时间表去生成一个周
var parseSheet = function(sheet) {
  var times = []
  var table = detectUpLeftTimeUnitPos(sheet)
  log(table)
  for (var k in sheet) {
    if (!k.includes('!')) { // 过滤掉无用的 k -- !ref !margins
      var v = sheet[k].w
      if (containValidTime(v)) {
        times.push(parseTime(v))
      }
    }
  }
  // 去除空的时间和无效的时间
  log(times)
}
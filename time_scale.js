/*
  这个文件用于管理时间相关的东西，因为显式的时间 unit 的长度也会变，互相转换？
  所以有必要把这个东西单独拿出来
  还要再想一想
*/

// 1.以滑块调整的
// 2.指定单位时间的
// 3.指定一天时间总长度的
var TimeScale = function(baseX, baseY) {
  var o = {}
  var height = 100 // TODO change it

  // 指定一天时间范围
  var dayBegin = []
  var dayEnd = []

  // 按 block 来划分
  var unitCount = 10 // TODO
  // begin: [10, 0], end: [2, 23]
  o.convertTimeToXY = function(begin, end) {

  }

  o.convertBlockToXY = function(i) {

  }

  o.changeDayRange = function(newBegin, newEnd) {
    dayBegin = newBegin
    dayEnd = newEnd
  }

  o.changeUnitCount = function(n) {
    unitCount = n
  }

  return o
}
/*
  这个文件用于管理时间相关的东西，因为显式的时间 unit 的长度也会变，互相转换？
  所以有必要把这个东西单独拿出来
  还要再想一想
  如果使用准确时间，可以把时间使用类似表格的的形式表示出来，可以方便修改
  当时间模式切换的时候，数据层通知（回调）显示层改变显示
  可以利用上面这种回调的方式写一些程序
  鼠标点击确定时间了，显示层回调 time 层的一个函数
  然后 time 把一个定下来的时间的数组传给显示层，这样在只有在改变这个数据的时候才需要改变
  这个数组，而不用每次显示层找 time 层要数据

  显示层定为对上层提供百分比显示的抽象

  TimeScale 统管时间数据的事，包括存储
  Screen 为显示这一层提供一层抽象
  Screen 从 TimeScale 那里知道需要显示哪些位置
*/

// 1.以滑块调整的
// 2.指定单位时间的
// 3.指定一天时间总长度的
var TimeScale = function(baseX, baseY) {
  var mode = false // false 代表使用 block 点击，true 代表使用精准时间
  // 把 Screen 的部分代码移过来
  // 设置一个开关设置两种时间模式
  var o = {}
  var height = 100 // TODO change it

  // 指定一天时间范围
  var dayBegin = [8, 0] // 8: 00
  var dayEnd = [18, 0] // 18: 00

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

  o.swichMode = function() {
    mode = !mode
  }

  o.unitLen = function() {
    // 表示单位时间，方便画图部分画单位
  }

  return o
}
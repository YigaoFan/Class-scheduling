// 对外，还是 screen 来处理各种触发事件
var Dashboard = function(canvas) {
  var context = canvas.getContext('2d')
  var o = {
    startPoint: [10, 10],
    dayWidth: 30,
    dayHeight: 150,
    nowColor: genColor(),
    viewUnit: ViewUnit(o.startPoint[0], o.startPoint[1], canvas.width, canvas.height, false),
    timeData: TimeData(),
  }

  o.init = function(weekCount, dayCount) {
    // 下面这两个 init 应该同步，所以应该归到同一个方法里
    // 时间的显示应该也是
    // init time data
    o.timeData.init(weekCount, dayCount)
    // init view unit
    // 下面这些代码应该可以分到 ViewUnit 里面
    var gap = 10
    var startX = o.startPoint[0]
    var startY = o.startPoint[1]
    for (var i = 0; i < weekCount; ++i) {
      var weekY = i * (o.dayHeight + gap) + startY
      var weekWidth = dayCount * o.dayWidth
      var weekView = ViewUnit(startX, weekY, weekWidth, o.dayHeight)

      for (var j = 0; j < dayCount; ++j) {
        var dayX = j * o.dayWidth + startX
        var dayView = ViewUnit(dayX, weekY, o.dayWidth, o.dayHeight)
        weekView.addSubUnit(dayView)
      }

      o.viewUnit.addSubUnit(weekView)
    }
    
    o.viewUnit.draw(context)
  }

  o.tryAddTimeUnit = function(x, y) {
    if (!o.timeData.blockMode || !o.viewUnit.contain(x, y)) {
      return
    }

    var select = o.viewUnit.trySelectUnit(x, y, o.nowColor)
    if (!select) {
      // change color
      o.nowColor = genColor()
    }
    // convert select to a specific format
    // then pass it to timeData
    // get data from timeData, then refresh UI
  }

  o.addDay = function() {

  }

  o.delDay = function() {

  }

  o.draw = function() {
    o.viewUnit.draw(context)
  }

  o.clear = function() {

  }

  o.addWeek = function() {

  }

  o.delWeek = function() {

  }

  o.clearClickedTime = function() {

  }

  o.showSameTimeOfExistedWeek = function() {

  }

  o.switchMode = function() {
    o.timeData.switchMode()
    // refresh dashboard view
  }

  return o
}
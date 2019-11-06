// 对外，还是 screen 来处理各种触发事件
var Dashboard = function(canvas) {
  var context = canvas.getContext('2d')
  var o = {
    startPoint: [10, 10],
    dayWidth: 30,
    dayHeight: 150,
    viewUnit: ViewUnit(o.startPoint[0], o.startPoint[1], canvas.width, canvas.height),
    timeData: TimeData(),
  }
  var timeData = TimeData()
  var nowColor = genColor()
  var changeColor = function() {
    nowColor = genColor()
  }
  var traverseWeek = function(callBack) {

  }
  var traverseDay = function(callBack) {

  }
  var traverseTimeUnit = function(callBack) {
    
  }

  o.init = function(weekCount, dayCount) {
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
  }

  o.tryAddTimeUnit = function(x, y) {
    if (!timeData.blockMode) {
      return
    }

    // iterate week
    if (notInWeek) {
      return
    }

    // calculate the x, y belong to which
    var addIfIn = function(unitX, unitY, weekIndex) {

    }
  }

  o.addDay = function() {

  }

  o.delDay = function() {

  }

  o.draw = function() {
    
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
    timeData.switchMode()
    // refresh dashboard view
  }

  return o
}
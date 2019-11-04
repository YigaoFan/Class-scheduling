// 对外，还是 screen 来处理各种触发事件
var Dashboard = function(canvas) {
  var context = canvas.getContext('2d')
  var o = {}
  var timeData = TimeData()
  var nowColor = genColor()
  var changeColor = function() {
    nowColor = genColor()
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
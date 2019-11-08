// 对外，还是 screen 来处理各种触发事件
var Dashboard = function(canvas, range = [8, 20]) {
    var context = canvas.getContext('2d')
  var o = {
    startPoint: [10, 10],
    dayWidth: 30,
    dayHeight: 150,
    nowColor: genColor(),
    timeData: TimeData(range),
  }
  o.viewUnit = ViewUnit(o.startPoint[0], o.startPoint[1], canvas.width, canvas.height, false),


  o.init = function(weekCount, dayCount) {
    // 下面这种 init 还是分开的，还是不那么好
    o.timeData.init(weekCount, dayCount)
    o.viewUnit.init(weekCount, dayCount, o.dayHeight, o.dayWidth)
    o.draw()
  }

  // 这个可能后期会做精确时间模式下的选中，暂时下面只处理选中 ViewUnit 的情况
  o.tryAddTimeUnit = function(x, y) {
    if (!o.timeData.blockMode || !o.viewUnit.contain(x, y)) {
      return
    }

    var selectUnit = o.viewUnit.trySelectUnit(x, y, o.nowColor)
    if (!selectUnit) {
      return
    }

    // change color
    o.nowColor = genColor()

    // convert select to a specific format
    var startDecimal = o.viewUnit.calStartDecimal(selectUnit[2])
    var passToTimeData= [selectUnit[0], selectUnit[1], startDecimal, o.timeData.unitLen()]
    // then pass it to timeData
    // get data from timeData, then refresh UI
  }

  o.addDay = function() {

  }

  o.delDay = function() {

  }

  o.draw = function() {
    o.viewUnit.draw(context, o.timeData.getFormatTimeData())
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
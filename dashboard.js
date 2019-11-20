// 对外，还是 screen 来处理各种触发事件
// 干脆以一个像素作为最基本的 ViewUnit 好了，这样两种某种程度上统一了
// 想一下这个项目的开发计划
var Dashboard = function(canvas, range = [8, 20]) {
  var o = {
    startPoint: [10, 10],
    dayWidth: 30,
    dayHeight: 150,
    nowColor: genColor(),
    timeData: TimeData(range),
  }

  var context = canvas.getContext('2d')
  o.viewUnit = ViewUnit(o.startPoint[0], o.startPoint[1], canvas.width, canvas.height, false)

  o.init = function(weekCount, dayCount) {
    // 下面这种 init 还是分开的，还是不那么好
    // 数据还是应该和 UI 在一块
    o.timeData.init(weekCount, dayCount)
    o.viewUnit.init(weekCount, dayCount, o.dayHeight, o.dayWidth)
    o.draw()
  }

  o.mouseMove = function(x, y) {
    if (!o.timeData.blockMode) {
      return
    }

    o.clear()
    o.draw()
    o.viewUnit.mouseMove(context, x, y, o.nowColor)
  }

  // 这个可能后期会做精确时间模式下的选中，暂时下面只处理选中 ViewUnit 的情况
  // 精确时间的修改还是直接用网页中显示表格内容的方式来修改吧
  o.tryAddTimeUnit = function(x, y) {
    if (!o.timeData.blockMode) {
      return
    }

    var selectUnit = o.viewUnit.trySelectUnit(context, x, y, o.nowColor)
    // log(selectUnit)
    if (!selectUnit) {
      return
    }

    // change color
    o.nowColor = genColor()

    // convert select to a specific format
    var startDecimal = (y - selectUnit[2].startY) / selectUnit[2].height
    o.timeData.addATime(selectUnit[0], selectUnit[1], startDecimal, o.timeData.unitLen())
    log('Week index: ', selectUnit[0])
    log('Day index: ', selectUnit[1])
    log('Start pos: ', startDecimal)
    log('len: ', o.timeData.unitLen())

    o.clear()
    o.draw()
  }

  o.addDay = function() {

  }

  o.delDay = function() {

  }

  o.draw = function() {
    queryerCurry = function(weekIndex) {
      return function(dayIndex) {
        return o.timeData.queryTimesInADay(weekIndex, dayIndex)
      }
    }
    o.viewUnit.draw(context, queryerCurry)
    // 这里如果 UI 和数据在一块，相对就好写一点了
  }

  o.clear = function() {
    context.clearRect(0, 0, canvas.width, canvas.height)
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
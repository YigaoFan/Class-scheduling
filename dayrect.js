//封装一个代表天的矩形的对象
var DayRect = function(x, y, width, height) {
  var o = {
    x: x,
    y: y,
    width: width,
    height: height,
    okTime: [],
  }
  // draw中调用这个对象的draw来画图
  o.draw = function(context, x, y) {
    // 画矩形框

    // 画确定的线

    // 画移动的线
  }
  // 判断是否包含在DayRect中
  o.contain = function(x, y) {
    // return boolean
  }
  // 把点击确定的时间添加到okTime中
  o.addOkTime = function(time) {
    // add time into okTime
  }
  return o
}
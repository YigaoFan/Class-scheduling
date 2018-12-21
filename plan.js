/*
现在是时候重构这个项目了！

现状：
1. 这个项目中draw的那部分太不优雅了，我想用类似如下的代码来draw：
  draw(dayReact)
  之后如果再有什么画图需求，那main里面可能就爆炸了
  这就还牵涉到构建dayRect这个类，这个类中确定的线的位置要保存，还要保存时间以方便之后的时间比对

2. 事件处理的部分。
  目前main里面有了4个事件处理，以后再有事件会爆炸的~
  事件也要想办法放到FanGua里
  目前的4个事件是：
    * 鼠标移动事件
    * 鼠标点击事件
    * add一天事件
    * del一天事件



*/
var WeekList = function() {
  o = {
    weeks: [week1, week2, ],
  }
  o.addWeek = function() {
    // ...
  }
  return o
}
var Week = function() {
  o = {
    days: [dayRect1, dayRect2, dayRect3, ],
  }
  o.addDay = function() {
    // ...
  }
  return o
}
var week2 = ...

  // DayRect 里面包含：
  //    * rectangle的位置和长宽
  //    * 里面包含的鼠标点击确定的时间点
  //        > 这个时间点用于生成线的位置
  var DayRect = function(x, y, width, height) {
    var o = {
      x: x,
      y: y,
      width: width,
      height: height,
      // 确定的时间点的细度到底怎样来设置呢？
      // 是以分钟，
      // 还是以半小时？
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

    }
    // 造一个工具函数用于把时间点转换成画线需要的位置信息
    // 造一个工具函数用于把线的位置信息转换成时间点，用于删除某个时间点

    return o
  }

var FanGua = function(...) {
  // ...

  // 在FanGua里面维护一个鼠标的位置
  var g = {
    // ...
    mousePos: {},
  }

  // 遍历weekList
  for (var i = 0; i < dayRectList.length; i++) {
    if (dayRectList[i].contain(mousePos.x, mousePos.y)) {
      // 调用dayRect里面画不定线的函数，至于这个函数怎么设计，
      // 比如是本身dayRect.draw里面是包含了一个draw不定线的函数调用
      dayrect.js:
        o.drawMoveLine = function(mousePos) {
          // ...
        }
      o.draw = function(context, x, y, mousePos) {
        // ...
        if (o.contain(mousePos)) {
          o.drawMoveLine(mousePos)
        }
      }
    }
  }
}

// mousedown的事件要在main调用FanGua之后去利用FanGua提供的函数注册一个，mousemove事件就在
// FanGua里面写好了
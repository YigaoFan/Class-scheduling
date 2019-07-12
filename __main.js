/*
1. 我们需要显示一个竖的矩形，表示一天的时间
2. 然后我们再考虑这样的几个功能：
    * 点按添加时间锚，未左键点击时，显示时间以提示；左键点击后，显示一条时间横线，表示确定下来，可以删除
    * 点击 + 号，添加新的一天，和添加新的一周
    * 点击“比对”按键之后，显示重合的时间，可再出现一行矩形周
*/

var FanGua = function(dayRect, dayRectList) {
  var g = {
    events: {},
  }
  var canvas = document.querySelector('#id-canvas')
  var context = canvas.getContext('2d')
  g.canvas = canvas
  g.context = context

  g.drawImage = function(guaImage) {
    g.context.drawImage(guaImage.image, guaImage.x, guaImage.y)
  }
  // timer
  setInterval(function() {
    // events
    //update
    g.update()
    //clear
    context.clearRect(0, 0, canvas.width, canvas.height)
    // context.clearRect(dayRect.x, dayRect.y, dayRect.width, dayRect.height)
    //draw
    g.draw(context, dayRectList)
  }, 1000 / 40)

  return g
}

var __main = function() {
  var weekManagement = WeekManagement();
  var dayRect = DayRect(10, 10, 40, 200)
  var dayRectList = [dayRect, ]
  // log(dayRectList)
  var gua = FanGua(weekManagement)

  var mousePos = {
    inRect: false,
    dayRectX: null,
    posY: null,
  }
  var okLocationList = []

  // 如果想把 Event也给打包到 FanGua里面，需要
  // 需要注册鼠标事件，然后产生相应的监听器
  // 在 g 里面把一些变量放进去，一旦事件触发，改变变量
  // draw的时候再去检测相应的变量，可以把注册变量的权力放给外面
  window.addEventListener('mousemove', function(event) {
    // 6 为手动校准量，否则感觉是鼠标中部在操作
    var x = event.clientX - 6
    var y = event.clientY - 6
    for (var i = 0; i < dayRectList.length; i++) {
      var e = dayRectList[i]
      if (x >= e.x && x <= (e.x + e.width)) {
        if (y >= e.y && y <= (e.y + e.height)) {
          //记录鼠标位置到底mousePos
          mousePos = {
            // 需要保存在哪一个dayRect中
            inRect: true,
            dayRectX: e.x,
            posY: y,
          }
          return
        }
      }
      mousePos = {
        inRect: false,
        // 下面这两个是否省略会有坏处呢，有时间的时候思考下
        dayRectX: null,
        posY: null,
      }
    }

  })

  // 鼠标点击确定一个时间戳
  window.addEventListener('mousedown', function(event) {
    // 6 为手动校准量，否则感觉是鼠标中部在操作
    var x = event.clientX - 6
    var y = event.clientY - 6

    // 这里应该可以直接读取mousePos来判断是否push
    //记录确定的位置
    if (mousePos.inRect) {
      okLocationList.push({
        dayRectX: mousePos.dayRectX,
        posY: mousePos.posY,
      })
    }
  })

  document.querySelector("#id-add-day").addEventListener('click', function(event) {
    // log(event)
    // 点击过后，触发一个程序添加一个DayRect对象到这个列表中
    // 判断一下当前是多少个了，然后创建一个相应位置的dayRect添加到list中
    var lastRect = dayRectList[dayRectList.length - 1]
    dayRectList.push(DayRect(lastRect.x + 50, lastRect.y, 40, 200))
  })

  document.querySelector("#id-del-day").addEventListener('click', function(event) {
    // log(event)
    // TODO: 底下那里划线的地方判断null很野鸡啊，要改
    if (dayRectList.length == 1) {
      for (var i = 0; i < okLocationList.length; i++) {
        if (okLocationList[i].dayRectX == dayRectList[0].x) {
          okLocationList[i].dayRectX = null
          okLocationList[i].posY = null
        }
      }
      return
    }
    var last = dayRectList.pop()
    for (var i = 0; i < okLocationList.length; i++) {
      if (okLocationList[i].dayRectX == last.x) {
        okLocationList[i].dayRectX = null
        okLocationList[i].posY = null
        // 以下两种写法都有问题，好好研究下
        // delete okLocationList[i]
        // okLocationList[i] = null
        //可能就依然还有确定的线存在
      }
    }
  })

  gua.update = function() {

  }

  gua.draw = function(context) {
    //draw
    for (var i = 0; i < dayRectList.length; i++) {
      context.strokeRect(dayRectList[i].x, dayRectList[i].y, dayRectList[i].width, dayRectList[i].height)
    }
    // 画出当前鼠标所在的线
    if (mousePos.inRect) {
      drawLine(mousePos.dayRectX, mousePos.posY, mousePos.dayRectX + dayRect.width, mousePos.posY, context)
    }
    // 画出已经点击确定的线
    for (var i = 0; i < okLocationList.length; i++) {
      var e = okLocationList[i]
      if (e.posY != null) {
        drawLine(e.dayRectX, e.posY, e.dayRectX + dayRect.width, e.posY, context)
      }
    }
  }
}

__main()








// TODO: 鼠标移动的同时，显示显示对应的时间
// TODO: 鼠标点击确定一个时间戳，保存一天时间数据
// TODO: 添加新的一天按钮
// TODO: 添加新的一周按钮
// TODO: 比对两周时间，显示结果
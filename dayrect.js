//封装一个代表天的矩形的对象
var DayRect = function(displayDayPosition) {
	var o = {
		x: displayDayPosition.x,
		y: displayDayPosition.y,
		width: weekSetting.rectLength,
		height: weekSetting.rectHeight,
		okTime: [],
	}

	// 判断是否包含在DayRect中
	o.contain = function(x, y) {
		if (x > o.x && x < o.x + o.width) {
			if (y.> o.y && y < o.y + o.height) {
				return true
			} else {
				return false
			}
		} else {
			return false
		}
	}

	// 把点击确定的时间添加到okTime中
	o.addOkTime = function(time) {
		// add time into okTime
	}

	o.display = function() {
		// show rectangle and the clicked line
	}

	o.ifInThenShow = function(mouse) {
		// TODO: mouse 的位置可能不准确，因为经过调整
		var x = mouse.x
		var y = mouse.y
		if (contain(x, y)) {
			drawLine(o.x, y, o.x + o.width, y, ctx)
		}
	} 

	return o
}

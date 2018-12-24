//封装一个代表天的矩形的对象
var DayRect = function(displayDayPosition) {
	var o = {
		x: displayDayPosition.x,
		y: displayDayPosition.y,
		width: width,
		height: height,
		okTime: [],
	}

	// 判断是否包含在DayRect中
	o.contain = function(x, y) {
		// return boolean
	}
	// 把点击确定的时间添加到okTime中
	o.addOkTime = function(time) {
		// add time into okTime
	}

	o.display = function() {
		// show code
	}

	o.ifInThenShow = function(mouse) {
		var x = mouse.x
		var y = mouse.y

	} 

	
	return o
}

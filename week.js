// 只处理数据结构？不处理显示逻辑？
var Week = function(displayWeekPosition) {
	var daysNum = 7
	var o = {
		days: [],
	}

	for (var i = 0; i < daysNum; i++) {
		o.days.push(DayRect(displayWeekPosition.giveDayPosition()))
	}

	o.destoryDisplayData = function() {
		displayWeekPosition.destory()
	}

	o.display = function() {
		for (int i = 0; i < daysNum; ++i) {
			o.days[i].display()
		}
	}

	o.ifInThenShow = function(mouse) {
		for (int i = 0; i < daysNum; ++i) {
			if (o.days[i].ifInThenShow(mouse)) {
				return true
			} 
		}

		return false
	}

	return o
}

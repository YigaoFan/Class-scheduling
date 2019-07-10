var WeekManagement = function(screen) {
	var o = {
		weekArray: [
			Week(screen.giveOneWeekDisplayPosition()),
		],
	}

	o.addWeek = function() {
		var week = Week(screen.giveOneWeekDisplayPosition())
		o.weekArray.push(week)
	}

	//TODO:可能暂时并没删除中间结点的需求
	o.removeWeek = function(index) {
		o.weekArray[index].destoryDisplayData()
		o.weekArray.splice(index, 1)
	}

	//o.getWeekArray = function() {
	//	reurn o.weekArray
	//}

	o.display = function() {
		for (var i = 0; i < o.weekArray.length; ++i) {
			o.weekArray[i].display()
		}
	}

	o.ifInThenShow = function(mouse) {
		for (var i = 0; i < o.weekArray.length; ++i) {
			if (o.weekArray[i].ifInThenShow(mouse)) {
				return true
			}
		}
		return false
	}

	return o
}

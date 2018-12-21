var WeekManagement = function (argument) {
	var o = {
		weekArray: [
		Week(),
		],
	}

	o.addWeek = function() {
		o.weekArray.push(Week())
	}

	o.removeWeek = function(index) {
		//o.weekArray.remove(index)
	}

	o.getWeekArray = function() {
		reurn o.weekArray
	}

	o.display = function() {
		for (var i = 0; i < o.weekArray.length; i++) {
			o.weekArray[i].display()
			// 类似于换行，是否维护一个全局的显示器对象
			screen.newLine()
		}
	}

	return o
}
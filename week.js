// 只处理数据结构？不处理显示逻辑？
var Week = function() {
	var daysNum = 7
	var o = {
		days: [],
	}

	for (var i = 0; i < daysNum; i++) {
		o.days.push(DayRect())
	}

	o.addDay = function() {
    // 暂时想的是不用参数的，根据days去检测就行
    }

    return o
}
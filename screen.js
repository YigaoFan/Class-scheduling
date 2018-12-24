var Screen = function(context, startX, startY) {
	var o = {
		// save Week rectangle upper-left corner position info
		positionHistory:[
			[	// validPositionX, validPositionY: 
				startX,
				startY,
			],
		],
	}

	o.giveMeOneWeekDisplayPosition = function() {
		var lastPos = o.positionHistory[o.length - 1]
		var newPos = [lastPos[0], lastPos[1] + rectHeight] 
		o.positionHistory.push(newPos) 
		return Screen(context, newPos[0], newPos[1])
	}

	o.deleteOneWeekDisplayPosition = function() {
		o.positionHistory.pop()
	}
	return o
}

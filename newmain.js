var mouse = {
	currentLocation: {
		x: null,
		y: null,
	},
	recentClickedLocation: {
		x: null,
		y: null,
	},
	validClickLocation: [],
}



window.addEventListener('mousemove', function(event) {
	mouse.x = event.clientX - 6
	mouse.y = event.clientY - 6
})

window.addEventListener('mousedown', function(event) {
	mouse.recentClickedLocation.x = event.clientX - 6
	mouse.recentClickedLocation.y = event.clientY - 6
})

var sreen = Screen(document.querySelector('#id-canvas').getContext('2d'), 8, 8)
var weekManagement = WeekManagement(Screen())

document.querySelector('#id-add-day', function('click', function(event) {
	weekManagement.addWeek()
}))

document.querySelector('#id-del-day', function('click', function(event) {
	weekManagement.removeWeek()
}))

var __main = function() {
	var canvas = document.querySelector('#id-canvas')
	var context = canvas.getContext('2d')

	weekManagement.check = function() {
		re
	}

	while(true) {
		switch(weekManagement.check()) {
			case
		}
		weekManagement.
	}
}

__main()

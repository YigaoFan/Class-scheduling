var log = console.log.bind(console)

var registerElementEventHandler = function(elementId, callBack, eventName = 'click') {
  document.querySelector(elementId).addEventListener(eventName, function(event) {
    callBack()
  })
}
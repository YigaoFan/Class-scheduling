var log = console.log.bind(console)

var registerElementEventHandler = function(elementId, callBack, eventName = 'click') {
  document.querySelector(elementId).addEventListener(eventName, function(event) {
    callBack()
  })
}

var genColor = function() {
  var genColorBit = function() {
    return parseInt(Math.random() * 255)
  }
  return 'rgb(' + genColorBit() + ',' + genColorBit() + ',' + genColorBit() + ')'
}
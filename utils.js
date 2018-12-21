var log = console.log.bind(console)

var drawLine = function(p1X, p1Y, p2X, p2Y, ctx) {
  var context = ctx
  context.beginPath()
  context.moveTo(p1X, p1Y)
  context.lineTo(p2X, p2Y)
  context.stroke()
}
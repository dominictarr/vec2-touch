var vtouch = require('../')
var vdom   = require('dom-vector')
var h      = require('hyperscript')
var Vec2   = require('vec2')

var canvas = h('canvas')
document.body.appendChild(canvas)
document.body.style.margin = '0px'
canvas.bgcolor = 'black'
//var rcanvas = vdom.element(canvas, true)

process.nextTick(function () {
  var size = vdom.screenSize()
  size.change(function () {
    canvas.width  = size.x
    //why is it 5 px too tall?
    canvas.height = size.y - 5 
  })
  canvas.width  = size.x
  canvas.height = size.y - 5
})

function setColour(ctx, colour) {
  ctx.strokeStyle = colour
  ctx.fillStyle = colour
}


var ctx = canvas.getContext('2d')
var TAU = Math.PI * 2
var colours = ['red', 'blue', 'green', 'yellow', 'orange', 'lightblue']

process.nextTick(function () {
  ctx.fillStyle = 'rgba(0, 0, 0, 1)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fill()
})

setInterval(function () {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fill()
}, 100)

function crossHair(touch) {
  ctx.moveTo(touch.x, 0)
  ctx.lineTo(touch.x, canvas.height)
  ctx.moveTo(0, touch.y)
  ctx.lineTo(canvas.width, touch.y)
}

vtouch(function (touch, touches) {
  var colour = colours.shift()
  var ctx = canvas.getContext('2d')
  colours.push(colour)

  var last = new Vec2().set(touch)

  setColour(ctx, colour)
  ctx.beginPath()
  crossHair(touch)
  ctx.stroke()

  touch.change(function () {

    setColour(ctx, colour)

    ctx.moveTo(last.x, last.y)
    ctx.lineTo(touch.x, touch.y)
    ctx.stroke()
    ctx.fill()
    ctx.beginPath()

    if(touch.id)
      ctx.arc(touch.x, touch.y, touch.force * 30, 0, TAU)
    else {
      var w = touch.force * 15
      ctx.fillRect(touch.x-w, touch.y-w, w*2, w*2 )
    }

    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    last.set(touch)

    if(touch.type == 'end') {
      ctx.beginPath()
      crossHair(touch)
      ctx.stroke()
    }

    if(touches.length > 1
    && touches.every(function (e) { return e && e.type != 'end' })) {
      //ctx.save()
      ctx.strokeStyle = 'white'
      ctx.moveTo(touches[0].x, touches[0].y)
      ctx.lineTo(touches[1].x, touches[1].y)
      ctx.stroke()
    }

    console.log(touch.type + '!')
  })
})


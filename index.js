var Vec2 = require('vec2')

Touch.prototype = new Vec2()

function Touch () {
  //browsers optimise properties set in the contructor.
  this.force = 0   ; this.event = null ; this.target = null;
  this.start = true; this.end   = false; this.type = 'init'
}

// should not be called by user.
// only browser should move touches.
Touch.prototype._set = function (e, ev) {
  console.log(e)
  this.force  = (e.force || e.webkitForce)
  this.event  = ev
  this.id     = e.identifier
  this.target = e.target
  this.type   = ev.type.substring(5)
  touch.end = this.type === 'end'
  this.set(e.clientX, e.clientY)
  if(this.type == 'end') {
    this.change()
    this.observers = [] //deregister listeners
  }
  return this
}

module.exports = function (el, handler, opts) {

  if('function' === typeof el)
    handler = el, el = document.documentElement, opts = handler || {}
  
  var touches = []

  function each(iter) {
    return function (ev) {
      [].forEach.call(ev.changedTouches,  function (e) { iter(e, ev) }) 
      if(opts.preventDefault)
        ev.preventDefault()
    }
  }

  var touchStart = each(function (e, ev) {
    handler(touches[e.identifier] = new Touch()._set(e, ev), touches)
  })

  var touchMove = each(function (e, ev) {
    touches[e.identifier]._set(e, ev)
  })

  var touchEnd = each(function (e, ev) {
    touches[e.identifier]._set(e, ev)
    touches[e.identifier] = null
  })

  el.addEventListener('touchstart',    touchStart)
  el.addEventListener('touchmove',     touchMove)
  el.addEventListener('touchend',      touchEnd)
  el.addEventListener('MozTouchStart', touchStart)
  el.addEventListener('MozTouchMove',  touchMove)
  el.addEventListener('MozTouchEnd',   touchEnd)
}


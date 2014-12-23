var Vec2;
if (typeof require !== 'undefined') {
  Vec2 = require('vec2');
} else if (window !== 'undefined') {
  Vec2 = window.Vec2;
}

Touch.prototype = new Vec2()

function Touch () {
  //browsers optimise properties set in the contructor.
  this.force = 0   ; this.event = null ; this.target = null;
  this.start = true; this.end   = false; this.type = 'init'
}

// should not be called by user.
// only browser should move touches.
Touch.prototype._update = function (e, ev) {
  ev = ev || e
  this.force  = (
    e.force || e.webkitForce || 
    Math.min((1 + ev.ctrlKey + ev.altKey + ev.shiftKey) / 3, 1)
  )

  this.event  = ev
  this.id     = e.identifier != null ? e.identifier : -1
  this.target = e.target
  this.type   = ev.type
  this.end = /(end|up)$/.test(this.type)
  this.set(e.clientX, e.clientY)

  if(this.end) {
    this.change()
    this.observers = [] //deregister listeners
  }
  return this
}

function vectorTouch(el, handler, opts) {

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
    handler(touches[e.identifier] = new Touch()._update(e, ev), touches)
  })

  var touchMove = each(function (e, ev) {
    touches[e.identifier]._update(e, ev)
  })

  var touchEnd = each(function (e, ev) {
    touches[e.identifier]._update(e, ev)
    delete touches[e.identifier]
  })

  el.addEventListener('touchstart',    touchStart)
  el.addEventListener('touchmove',     touchMove)
  el.addEventListener('touchend',      touchEnd)
  
  if(opts.mouse !== false) {
    var down = false
    el.addEventListener('mousedown', function (ev) {
      down = true
      handler(touches[-1] = new Touch()._update(ev), touches)
    }) 
    el.addEventListener('mousemove', function (ev) {
      if(!down) return
      touches[-1]._update(ev)
    })
    el.addEventListener('mouseup',   function (ev) {
      down = false
      touches[-1]._update(ev)    
      delete touches[-1]
    }) 
  }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = vectorTouch;
}

if (typeof window !== 'undefined') {
  window.vectorTouch = vectorTouch;
}

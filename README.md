# vector-touch

Represent multitouch with vec2

## Rant

If you desire reusable software modules, you must implement ideas
that are broadly applicable.
They should be based on ideas that are _true in many places_.

So much "front-end" stuff is just about generating HTML or CSS.
But, there is nothing particularily _true_ about html or css.
It's just a tool for typesetting, and by no means the best one.

But what is true is geometry. Geometry is true _everywhere_.
It will still be true when no body uses HTML, if that ever happens.
Yet, everything on the html page is a rectangle or a point.

Call something by it's [true name](http://tvtropes.org/pmwiki/pmwiki.php/Main/IKnowYourTrueName)
and you have power over it.

Html is merely theurgy, speak the right incartations and the browser spirits
with appear, but say the wrong ones and the will hurt you.

But, geometry is true Rule Magic.
If you can speak to geometry then you can control the forces that breath life into 
the browser spirits and they will be forced to do your bidding.

See also: [vec2](https://github.com/tmpvar/vec2.js)

## Example

track all touches on the page.

``` js
var touches = require('dom-vector-touches')

touches(function (touch) {
  //handle start here...

  //follow touch...
  touch.change(function (touch) {
    //handle move

    if(touch.end) {
      //handle end of touch.

    }
  })
  //the change listener is automatically removed when finger is lifted!
})
```

Note that this pattern is kinda like a
[server](http://nodejs.org/api/net.html#net_net_createserver_options_connectionlistener)
A touch is like a stream, and your app recieves many touches,
potentially in parallel!

## API

### touches(el?, listener(touch, touches))

Listen for touches - when a touch starts, the listener is called.
The listener should then call `touch.change(onChange)` to receive
updates as the touch moves.

### Touch 

Object representing a touch. This is an subclass of
[Vec2](https://github.com/tmpvar/vec2.js) with a few extra properties.

``` js
touch.x      //x coord (clientX)
touch.y      //y coord (clientY)
touch.force  //firmness of touch
touch.target //element being touched
touch.event  //DOM original dom touch event
touch.type   //'start' 'move' or 'end'
touch.end    //boolean - is the touch ended.
touch.change(function () {
  //called whenever x or y changes.
})
```

## License

MIT

# vector-touch

represent multitouch with vec2

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

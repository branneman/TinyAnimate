# TinyAnimate
Animation micro library. Vanilla JavaScript, includes a global and [UMD](https://github.com/umdjs/umd). Minified to only 3.8kb. Uses `requestAnimationFrame()` if available, falls back to `setTimeout()`.

Supports all the easings you can find on **[easings.net](http://easings.net/)**, and **custom easing functions**.

#### [Download ZIP](https://github.com/branneman/TinyAnimate/releases) | [![npm version](https://badge.fury.io/js/TinyAnimate.svg)](https://www.npmjs.org/package/TinyAnimate)

## Examples

### Animating a CSS style:
```javascript
var square = document.querySelector('.square');
TinyAnimate.animateCSS(square, 'marginLeft', 'px', 10, 70, 500, 'easeInOutQuart', function() {
    console.log('done!!!111oneone');
});
```

### Animating the 'x' property on an SVG element:
```javascript
var square = document.querySelector('.square');
TinyAnimate.animate(70, 10, 1000, function(x) {
    square.setAttribute('x', x);
});
```

### Using Require.js, changing the opacity of a rgba color:
```javascript
define(['TinyAnimate'], function(TinyAnimate) {
    var elem = document.querySelector('button.send');
    elem.addEventListener('click', function(e) {
        TinyAnimate.animate(1, .5, 500, function(opacity) {
            square.style.backgroundColor = 'rgba(65, 131, 196, ' + opacity + ')';
        });
    });
});
```

## Usage

### Interface
1. `TinyAnimate.animate(from, to, duration, update, easing, done)`
    - `from` (int) — Property value to animate from
    - `to` (int) — Property value to animate to
    - `duration` (int) — Duration in milliseconds
    - `update` (function) — Function to implement updating the DOM, get's called with a value between `from` and `to`
    - `easing` (string | function) — Optional: A string when the easing function is available in `TinyAnimate.easings`, or a function with the signature: `function(t, b, c, d) {...}`
    - `done` (function) — Optional: To be executed when the animation has completed.
2. `TinyAnimate.animateCSS(element, property, unit, from, to, duration, easing, done)`
    - `element` (HTMLElement) — A dom node
    - `property` (string) — Property name, as available in element.style, i.e. 'borderRadius', not 'border-radius'
    - `unit` (string) — Property unit, like 'px'
    - `from` (int) — Property value to animate from
    - `to` (int) — Property value to animate to
    - `duration` (int) — Duration in milliseconds
    - `easing` (string | function) — Optional: A string when the easing function is available in `TinyAnimate.easings`, or a function with the signature: `function(t, b, c, d) {...}`
    - `done` (function) — Optional: To be executed when the animation has completed.
3. `TinyAnimate.cancel(animation)`
    - `animation` (object) - Animation object returned from `animate` or `animateCSS`.

### Easings
All the easings found at [easings.net](http://easings.net/) are supported. I suggest you strip out all the easings you
do not use in production to keep the bytes down. If you don't specify an easing, or specify an incorrect easing, the
default linear easing will be used.

It's also possible to specify the easing as a function. Read more about creating easing functions manually
[here](http://upshots.org/actionscript/jsas-understanding-easing) and
[here](http://greweb.me/2012/02/bezier-curve-based-easing-functions-from-concept-to-implementation/).

### requestAnimationFrame
It uses the unprefixed version of `requestAnimationFrame`, if available. You can however include a polyfill as well, if
you need to support more browsers. See [caniuse.com/requestanimationframe](http://caniuse.com/requestanimationframe) for
more detailed browser support, everthing that needs a prefix will only use `requestAnimationFrame` whenever a polyfill
has been included. If `window.requestAnimationFrame` is not found, `setTimeout()` will be used.

A polyfill for `requestAnimationFrame` is included in the project, but you are **not required** to use it. Choose wisely.

## License
Released under the [MIT license](http://github.com/branneman/TinyAnimate/blob/master/).

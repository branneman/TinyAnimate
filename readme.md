# TinyAnimate
Animation micro library. Vanilla JavaScript. Include only what you need, can be uglified to only 330 bytes. Uses
`requestAnimationFrame()` if available, falls back to `setTimeout()`.

## [Download](/branneman/TinyAnimate/releases)

## Usage

### Functions
1. `TinyAnimate.animate(from, to, duration, update, easing, done)`
    - `from` (int) — Property value to animate from
    - `to` (int) — Property value to animate to
    - `duration` (int) — Duration in milliseconds
    - `update` (function) — Function to implement updating the DOM, get's called with a value between `from` and `to`
    - `easing` (string | function) — Optional: A string when the easing function is available in `window.TinyAnimate.easings`, or a function with the signature: `function(t, b, c, d) {...}`
    - `done` (function) — Optional: To be executed when the animation has completed.
2. `TinyAnimate.animateCSS(element, property, unit, from, to, duration, easing, done)`
    - `element` (HTMLElement) — A dom node
    - `property` (string) — Property name, as available in element.style, i.e. 'borderRadius', not 'border-radius'
    - `unit` (string) — Property unit, like 'px'
    - `from` (int) — Property value to animate from
    - `to` (int) — Property value to animate to
    - `duration` (int) — Duration in milliseconds
    - `easing` (string | function) — Optional: A string when the easing function is available in `window.TinyAnimate.easings`, or a function with the signature: `function(t, b, c, d) {...}`
    - `done` (function) — Optional: To be executed when the animation has completed.

### Easings
To stay small, the TinyAnimate microlib works without easings. We encourage you to ship it with only the easing
functions you actually use in your project. All the easings found at [easings.net](http://easings.net/) are implemented
in the file `TinyAnimate.easings.js`, which you can optionally include in your project. I suggest you strip out all the
easings you do not use in production to keep the bytes down. If you specify an incorrect easing or forgot to include the
easings file, a linear easing will be used.

It's also possible to specify the easing as a function. Read more about creating easing functions manually
[here](http://upshots.org/actionscript/jsas-understanding-easing) and
[here](http://greweb.me/2012/02/bezier-curve-based-easing-functions-from-concept-to-implementation/).

### requestAnimationFrame
It uses the unprefixed version of `requestAnimationFrame`, if available. You can however include a polyfill as well, if
you need to support more browsers. See [caniuse.com/requestanimationframe](http://caniuse.com/requestanimationframe) for
more detailed browser support, everthing that needs a prefix will only use `requestAnimationFrame` whenever a polyfill
is found. If `window.requestAnimationFrame` is not found, `setTimeout()` will be used.

A polyfill for `requestAnimationFrame` is included in the project, but you are **not required** to use it.

### Examples
#### Animating a CSS style:
    var square = document.querySelector('.square');
    TinyAnimate.animateCSS(square, 'marginLeft', 'px', 10, 70, 500, 'easeInOutQuart', function() {
        console.log('done!!!111oneone');
    });
#### Animating the 'x' property on an SVG element:
    var square = document.querySelector('.square');
    TinyAnimate.animate(70, 10, 1000, function(x) {
        square.setAttribute('x', x);
    });

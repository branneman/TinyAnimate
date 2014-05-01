/**
 * TinyAnimate
 *  version 0.1.0
 *
 * Source:  https://github.com/branneman/TinyAnimate
 * Author:  Bran van der Meer <branmovic@gmail.com> (http://bran.name/)
 * License: MIT
 *
 * Functions:
 *  TinyAnimate.animate(from, to, duration, update, easing, done)
 *  TinyAnimate.animateCSS(element, property, unit, from, to, duration, easing, done)
 *
 * Parameters:
 *  element   HTMLElement        A dom node
 *  property  string             Property name, as available in element.style, i.e. 'borderRadius', not 'border-radius'
 *  unit      string             Property unit, like 'px'
 *  from      int                Property value to animate from
 *  to        int                Property value to animate to
 *  duration  int                Duration in milliseconds
 *  update    function           Function to implement updating the DOM, get's called with a value between `from` and `to`
 *  easing    string | function  Optional: A string when the easing function is available in
 *                                window.TinyAnimate.easings, or a function with the signature: function(t, b, c, d) {...}
 *  done      function           Optional: To be executed when the animation has completed.
 */
(function() {

    /**
     * TinyAnimate.animate()
     */
    function animate(from, to, duration, update, easing, done) {

        // Early bail out if called incorrectly
        if (typeof from !== 'number' || typeof to !== 'number' || typeof duration !== 'number' || typeof update !== 'function') {
            return;
        }

        // Determine easing
        if (typeof easing === 'string' && window.TinyAnimate.easings && window.TinyAnimate.easings[easing]) {
            easing = window.TinyAnimate.easings[easing];
        }
        if (typeof easing !== 'function') {
            easing = function linearEasing(t, b, c, d) {
                return c * t / d + b;
            };
        }

        // Determine
        if (typeof done !== 'function') {
            done = function() {};
        }

        // Pick implementation (requestAnimationFrame | setTimeout)
        var rAF = window.requestAnimationFrame || function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };

        // Animation loop
        var change = to - from;
        function loop() {
            var time = +new Date() - start;
            update(easing(time, from, change, duration));
            if (time >= duration) {
                update(to);
                done();
            } else {
                rAF(loop);
            }
        }
        update(from);

        // Start animation loop
        var start = +new Date();
        rAF(loop);
    }

    /**
     * TinyAnimate.animateCSS()
     *  Shortcut method for animating css properties
     */
    function animateCSS(element, property, unit, from, to, duration, easing, done) {

        var update = function(value) {
            element.style[property] = value + unit;
        };
        animate(from, to, duration, update, easing, done);
    }

    /**
     * Expose methods
     */
    window.TinyAnimate = window.TinyAnimate || {};
    window.TinyAnimate.animate = animate;
    window.TinyAnimate.animateCSS = animateCSS;

}());

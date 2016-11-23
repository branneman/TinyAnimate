/**
 * TinyAnimate
 *  version 0.3.0
 *
 * Source:  https://github.com/branneman/TinyAnimate
 * Author:  Bran van der Meer <branmovic@gmail.com> (http://bran.name/)
 * License: MIT
 *
 * Functions:
 *  TinyAnimate.animate(from, to, duration, update, easing, done)
 *  TinyAnimate.animateCSS(element, property, unit, from, to, duration, easing, done)
 *  TinyAnimate.cancel(animation)
 *
 * Parameters:
 *  element   HTMLElement        A dom node
 *  property  string             Property name, as available in element.style, i.e. 'borderRadius', not 'border-radius'
 *  unit      string             Property unit, like 'px'
 *  from      int                Property value to animate from
 *  to        int                Property value to animate to
 *  duration  int                Duration in milliseconds
 *  update    function           Function to implement updating the DOM, get's called with a value between `from` and `to`
 *  easing    string | function  Optional: A string when the easing function is available in TinyAnimate.easings,
 *                                or a function with the signature: function(t, b, c, d) {...}
 *  done      function           Optional: To be executed when the animation has completed.
 *
 * Returns:
 *  animation object             Animation object that can be canceled.
 */

/**
 * Universal Module Dance
 *  config: CommonJS Strict, exports Global, supports circular dependencies
 *  https://github.com/umdjs/umd/
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], function(exports) {
            factory((root.TinyAnimate = exports));
        });
    } else if (typeof exports === 'object') {
        factory(exports);
    } else {
        factory((root.TinyAnimate = {}));
    }
}(this, function(exports) {

    /**
     * TinyAnimate.animate()
     */
    exports.animate = function(from, to, duration, update, easing, done) {

        // Early bail out if called incorrectly
        if (typeof from !== 'number' ||
            typeof to !== 'number' ||
            typeof duration !== 'number' ||
            typeof update !== 'function')
            return;

        // Determine easing
        if (typeof easing === 'string' && easings[easing]) {
            easing = easings[easing];
        }
        if (typeof easing !== 'function') {
            easing = easings.linear;
        }

        // Create mock done() function if necessary
        if (typeof done !== 'function') {
            done = function() {};
        }

        // Pick implementation (requestAnimationFrame | setTimeout)
        var rAF = window.requestAnimationFrame || function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };

        // Animation loop
        var canceled = false;
        var change = to - from;
        function loop(timestamp) {
            if (canceled) {
                return;
            }
            var time = (timestamp || +new Date()) - start;
            if (time >= 0) {
                update(easing(time, from, change, duration));
            }
            if (time >= 0 && time >= duration) {
                update(to);
                done();
            } else {
                rAF(loop);
            }
        }
        update(from);

        // Start animation loop
        var start = window.performance && window.performance.now ? window.performance.now() : +new Date();

        rAF(loop);

        return {
            cancel: function() {
                canceled = true;
            }
        };
    };

    /**
     * TinyAnimate.animateCSS()
     *  Shortcut method for animating css properties
     */
    exports.animateCSS = function(element, property, unit, from, to, duration, easing, done) {

        var update = function(value) {
            element.style[property] = value + unit;
        };
        return exports.animate(from, to, duration, update, easing, done);
    };

    /**
     * TinyAnimate.cancel()
     *  Method for canceling animations
     */
    exports.cancel = function(animation) {
        if (!animation) {
            return;
        }
        animation.cancel();
    };

    /**
     * TinyAnimate.easings
     *  Adapted from jQuery Easing
     */
    var easings = exports.easings = {};
    easings.linear = function(t, b, c, d) {
        return c * t / d + b;
    };
    easings.easeInQuad = function(t, b, c, d) {
        return c * (t /= d) * t + b;
    };
    easings.easeOutQuad = function(t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    };
    easings.easeInOutQuad = function(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    };
    easings.easeInCubic = function(t, b, c, d) {
        return c * (t /= d) * t * t + b;
    };
    easings.easeOutCubic = function(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    };
    easings.easeInOutCubic = function(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    };
    easings.easeInQuart = function(t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    };
    easings.easeOutQuart = function(t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    };
    easings.easeInOutQuart = function(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    };
    easings.easeInQuint = function(t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    };
    easings.easeOutQuint = function(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    };
    easings.easeInOutQuint = function(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    };
    easings.easeInSine = function(t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    };
    easings.easeOutSine = function(t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    };
    easings.easeInOutSine = function(t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    };
    easings.easeInExpo = function(t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    };
    easings.easeOutExpo = function(t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    };
    easings.easeInOutExpo = function(t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    };
    easings.easeInCirc = function(t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    };
    easings.easeOutCirc = function(t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    };
    easings.easeInOutCirc = function(t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    };
    easings.easeInElastic = function(t, b, c, d) {
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        }
        else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    };
    easings.easeOutElastic = function(t, b, c, d) {
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        }
        else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    };
    easings.easeInOutElastic = function(t, b, c, d) {
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (.3 * 1.5);
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        }
        else var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    };
    easings.easeInBack = function(t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    };
    easings.easeOutBack = function(t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    };
    easings.easeInOutBack = function(t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    };
    easings.easeInBounce = function(t, b, c, d) {
        return c - easings.easeOutBounce(d - t, 0, c, d) + b;
    };
    easings.easeOutBounce = function(t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    };
    easings.easeInOutBounce = function(t, b, c, d) {
        if (t < d / 2) return easings.easeInBounce(t * 2, 0, c, d) * .5 + b;
        return easings.easeOutBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    };

}));

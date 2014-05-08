require(['src/TinyAnimate'], function(TinyAnimate) {

    var tests = document.querySelectorAll('.test-unit');

    [].forEach.call(tests, function(test) {
        test.querySelector('button').addEventListener('click', function() {
            window.tests[test.id](TinyAnimate);
        });
    });

});
import $ from 'jquery';
import Clipboard from 'clipboard';
import Bowser from 'bowser';

const browser = Bowser.getParser(window.navigator.userAgent);
const isValidBrowser = browser.satisfies({
    desktop: {
        firefox: '>=28',
        chrome: '>=25',
        edge: '>=79'
    }
});
if (isValidBrowser) {
    $('.logo-container').prepend('<video width="100%" height="100%" id="logo-animated" playsinline autoplay muted><source src="assets/logo_animated.webm" type="video/webm"></video>');
} else {
    $('.logo-container').prepend('<img src="assets/logo.png" alt="UCubeSat Logo">');
}

// Source of below: https://stackoverflow.com/a/20082518
// Generic function to set blur radius of $ele
const setBlur = function (ele, radius) {
        $(ele).css({
            "-webkit-filter": "blur(" + radius + "px)",
            "filter": "blur(" + radius + "px)"
        });
    },
    // Generic function to tween blur radius
    tweenBlur = function (ele, startRadius, endRadius, durationMillis) {
        $({blurRadius: startRadius}).animate({blurRadius: endRadius}, {
            duration: durationMillis,
            easing: 'swing',
            step: function () {
                setBlur(ele, this.blurRadius);
            },
            callback: function () {
                setBlur(ele, endRadius);
            }
        });
    };

new Clipboard('.email-button');

$(window).on('load', function () {
    $('.email-button').click(function () {
        const animationClassName = 'animation-up';
        $('.email-button-copied-text').addClass(animationClassName);
        setTimeout(function () {
            $('.email-button-copied-text').removeClass(animationClassName);
        }, 2000);
    });

    setTimeout(function () {
        $('.content').animate({opacity: 1}, 1000);
    }, 500);
    tweenBlur('.landing-background', 0, 10, 1500);
});

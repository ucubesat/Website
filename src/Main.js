import $ from 'jquery';
import Clipboard from 'clipboard';

new Clipboard('.email-button');

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

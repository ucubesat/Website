import $ from 'jquery';
import Clipboard from 'clipboard';

new Clipboard('.email-button');

const MobileDetect = require('mobile-detect/mobile-detect.min');

$(window).on('load', function () {
    if (MobileDetect.mobile != null) {
        $('.email-button').click(function () {
            const animationClassName = 'animation-up';
            $('.email-button-copied-text').addClass(animationClassName);
            setTimeout(function () {
                $('.email-button-copied-text').removeClass(animationClassName);
            }, 2000);
        });
    } else {
        $('.email-button').click(function () {
            const animationClassName = 'animation-up';
            $('.email-button-copied-text').addClass(animationClassName);
            setTimeout(function () {
                $('.email-button-copied-text').removeClass(animationClassName);
            }, 2000);
        });
        // $('.email-button').attr("href", "mailto:contact@ucubesat.org");
    }
});

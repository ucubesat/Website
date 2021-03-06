import $ from 'jquery';
import Clipboard from 'clipboard';

new Clipboard('.email-button');

const MobileDetect = require('mobile-detect/mobile-detect.min');

$(window).on('load', function () {
    if (MobileDetect.mobile != null) {
        $('.email-button').attr("href", "mailto:contact@ucubesat.org");
    } else {
        $('.email-button').click(function () {
            const animationClassName = 'animation-up';
            $('.email-button-copied-text').addClass(animationClassName);
            setTimeout(function () {
                $('.email-button-copied-text').removeClass(animationClassName);
            }, 2000);
        });
    }
});

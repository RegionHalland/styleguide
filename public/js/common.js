/**
 * Needed functions in library.js
 * - setCookie()
 * - debounce()
 */

$(document).ready(function () {
    // ************************************
    // *** Find on page scroll function ***
    // ************************************
    $('a[href^="#"]').on("click", function () {
        var target = $(this.hash);
        if (target.length) {
            // Animate target
            $('html,body').animate({ scrollTop: target.offset().top }, 1000);
            // Add class for highlight the text
            $(target).addClass("content-highlight");
            // Wait 1.5 s and then remove the highlight class
            setTimeout(function () {
                $(target).removeClass("content-highlight");
            }, 1500);
            return false;
        }
    });

    // ****************************
    // *** Cookie notice accept ***
    // ****************************
    $("#cookie-consent").on("click", function () {
        // set cookie with vanilla javascript function
        setCookie('cookie_notice_accepted', '1', 365);
        // Hide div with cookie notice text + button
        $("#cookie-notice").hide();
    });

    // *****************************
    // *** Fix fixed css for IE  ***
    // *****************************
    if ($("body.page-template-default")[0]) {
        $(window).scroll(debounce(function () {
            var $contentNavPlaceholder = $('#content-nav-placeholder');

            if ($contentNavPlaceholder.length) {
                var myPosition = Math.round($contentNavPlaceholder.offset().top - $(window).scrollTop());

                if (myPosition < 30) {
                    $contentNavPlaceholder.addClass("rh-get-fixed-sticky");
                } else {
                    $contentNavPlaceholder.removeClass("rh-get-fixed-sticky");
                }
            }
        }, 10));
    }
});
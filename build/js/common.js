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

    // *****************************
    // ***   Content navigation  ***
    // *****************************
    if ($("body.page-template-default")[0]) {
        var $contentNavPlaceHolder = $('#content-nav-placeholder'),
            $contentNavContainer = $("#content-nav-container");

        $(window).scroll(debounce(function () {
            if ($contentNavPlaceHolder.length) {
                var myPosition = Math.round($contentNavPlaceHolder.offset().top - $(window).scrollTop());

                if (myPosition < 30) {
                    $contentNavContainer.addClass("rh-get-fixed-sticky");
                } else {
                    $contentNavContainer.removeClass("rh-get-fixed-sticky");
                }
            }
        }, 10));
    }

    // ****************************
    // *** Cookie notice accept ***
    // ****************************
    $("#cookie-consent").on("click", function () {
        // set cookie with vanilla javascript function
        setCookie('cookie_notice_accepted', '1', 365);
        // Hide div with cookie notice text + button
        $("#cookie-notice").hide();
    });
});
// Needed function:
// throttle() - /public/library.js
$(document).ready(function () {
    var $buttonBackToTop = $("#back-to-top");

    $(window).scroll(throttle(function () {
        if ($(this).scrollTop() > 500) {
            $buttonBackToTop.fadeIn("slow");
        } else {
            $buttonBackToTop.fadeOut("slow");
        }
    }, 200));

    $buttonBackToTop.hide();
    $buttonBackToTop.click(function (e) {
        e.stopPropagation();
        $('body,html').animate({ scrollTop: 0 }, 800);
    });
});

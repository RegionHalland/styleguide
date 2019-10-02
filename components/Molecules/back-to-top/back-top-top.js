// Needed function:
// throttle() - /public/library.js
$(document).ready(function () {
    var $buttonBackToTop = $("#back-to-top"),
        btnBackToTopLimitOnHead = 500,
        btnBackToTopCurrentPos;

    $(window).scroll(throttle(function () {
        btnBackToTopCurrentPos = $(this).scrollTop(); // Update current position

        if (btnBackToTopCurrentPos > btnBackToTopLimitOnHead) {
            !$buttonBackToTop.is(':visible') && $buttonBackToTop.fadeIn("slow");
        } else {
            $buttonBackToTop.is(':visible') && $buttonBackToTop.fadeOut("slow");
        }
    }, 200));

    $buttonBackToTop.hide();
    $buttonBackToTop.click(function (e) {
        e.stopPropagation();
        $('body,html').animate({ scrollTop: 0 }, 800);
    });
});

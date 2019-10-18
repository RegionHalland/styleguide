// Needed function:
// throttle() - /public/library.js
$(document).ready(function () {
    var $btnBackToTop = $("#back-to-top"),
        btnBackToTopLimitOnHead = 500,
        btnBackToTopCurrentPos = $(window).scrollTop(); // Initial state

    btnBackToTopCurrentPos < btnBackToTopLimitOnHead ? $btnBackToTop.hide() : $btnBackToTop.show();

    $(window).scroll(throttle(function () {
        btnBackToTopCurrentPos = $(this).scrollTop(); // Update current position

        if (btnBackToTopCurrentPos > btnBackToTopLimitOnHead) {
            !$btnBackToTop.is(':visible') && $btnBackToTop.fadeIn("slow");
        } else {
            $btnBackToTop.is(':visible') && $btnBackToTop.fadeOut("slow");
        }
    }, 200));

    $btnBackToTop.click(function (e) {
        e.stopPropagation();
        $('body,html').animate({ scrollTop: 0 }, 800);
    });
});

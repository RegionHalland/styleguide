$(document).ready(function () {
    $(".rh-block-box").focusin(function(e) {
        e.stopPropagation();
        $(this).addClass("rh-block--focus");
    });

    $(".rh-block-box").focusout(function(e) {
        e.stopPropagation();
        $(this).removeClass("rh-block--focus");
    });
});
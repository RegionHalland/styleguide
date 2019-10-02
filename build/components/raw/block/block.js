$(document).ready(function () {
    // This code fixs :focus-within behavior on IE11 and older browsers
    var $blockBoxItems = $(".rh-block-box");

    $blockBoxItems.focusin(function(e) {
        e.stopPropagation();
        $(this).addClass("rh-block--focus");
    });

    $blockBoxItems.focusout(function (e) {
        e.stopPropagation();
        $(this).removeClass("rh-block--focus");
    });
});
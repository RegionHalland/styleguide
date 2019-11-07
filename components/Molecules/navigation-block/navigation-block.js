$(document).ready(function () {
    // The code fixs :focus-within behavior on IE11 and older browsers
    var $navigationBlockItems = $(".rh-navigation-block");

    $navigationBlockItems.focusin(function(e) {
        e.stopPropagation();
        $(this).addClass("rh-navigation-block--focus");
    });

    $navigationBlockItems.focusout(function (e) {
        e.stopPropagation();
        $(this).removeClass("rh-navigation-block--focus");
    });
});
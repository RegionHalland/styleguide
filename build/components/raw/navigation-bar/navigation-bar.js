
$(".rh-navigation-bar__link").keydown(function() {
    switch (event.which) {
        case 39:
            if($(this).parent().next().length === 0) {
                $(this).parent().siblings().first().children().first().focus();
            } else {
                $(this).parent().next().children().first().focus();
            }
            break;
        case 37:
            if($(this).parent().prev().length === 0) {
                $(this).parent().siblings().last().children().first().focus();
            } else {
                $(this).parent().prev().children().first().focus();
            }
            break;
    }
});
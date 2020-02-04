$(".rh-tabs__item").keydown(function() {
    //console.log(event.which);
    switch (event.which) {
        case 39:
            if($(this).next().length == 0) {
                $(this).siblings().first().focus();
            } else {
                $(this).next().focus();
            }
            break;
        case 37:
            if($(this).prev().length == 0) {
                $(this).siblings().last().focus();
            } else {
                $(this).prev().focus();
            }
            break;
    }
});
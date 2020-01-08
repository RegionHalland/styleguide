$(".rh-linkgroup__titlebar").click(function(){
    $(this).parent().next().toggle();
    $(this).toggleClass("rh-linkgroup__titlebar--active");
    $(this).attr('aria-expanded',$(this).attr('aria-expanded')==='true'?'false':'true' );
});
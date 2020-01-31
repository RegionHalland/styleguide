/* Slide menu (from right) */
/* Needed helpers in /public/library.js
    throttle()
    calculateScrollbarWidth()
    isMobileDevice()

    Needed library: bodyScrollLock-2.6.3.min.js
*/

$(document).ready(function () {
    var scrollbarWidth = calculateScrollbarWidth(),
        isIDevice = isMobileDevice();

    var $body = $('body'),
        $menuMainButton = $('#rh-menu-main-button'),
        $menuCloseButton = $('#rh-menu-close-button'),
        $menuBody = $('#rh-menu-body');

    var $menuOverlay = $('.rh-menu__overlay'),
        $menuTopBar = $('.rh-menu__top-bar'),
        $menuBodyOffsetTop = $('.rh-menu__offset-top');

    var $menuMainButtonDefaultPaddingRight = "0.71875em", // 11.5px - View more in CSS
        $menuBodySpaceTop = 30;

    // Initial state
    $menuBody.addClass('rh-pos--fixed rh-dp--none').css({ "top": $(window).scrollTop() });
    $menuTopBar.css({ "max-width": $menuBody.width() });

    $(window).resize(throttle(function () {
        scrollbarWidth = calculateScrollbarWidth();
        $menuTopBar.css({ "max-width": $menuBody.width() });
    }, 80));

    // Update menu's body position when scrolling
    $(document).scroll(throttle(function () {
        $menuBody.css({ "top": $(window).scrollTop() });
    }, 200));

    $menuMainButton.click(function (e) {
        e.stopPropagation();
        e.preventDefault();

        menuLockBodyScrolling(true);

        $menuOverlay.toggleClass('rh-dp--none rh-dp--show');

        $menuTopBar
            .addClass('rh-pos--fixed')
            .css({
                "width": "100%",
                "max-width": $menuBody.width(),
                "padding-right": parseInt($menuTopBar.css('padding-right')) + scrollbarWidth
            });

        $menuBody
            .removeClass('rh-dp--none')
            .addClass('rh-dp--show')
            .removeClass('rh-pos--fixed')
            .addClass('rh-pos--absolute')// Using the position "absolute" for iOS performance
            .css({ "top": $(window).scrollTop() })
            .addClass('rh-menu__body--show');

        $menuBodyOffsetTop.css({ "height": parseInt($menuTopBar.height() + $menuBodySpaceTop) });
    });

    $menuCloseButton.click(function (e) {
        e.stopPropagation();
        e.preventDefault();
        closeMenu();
    });

    // Press Escape key to close menu
    $(document).keyup(function (e) {
        e.stopPropagation();
        e.preventDefault();
        var isMenuOpen = $menuBody.hasClass("rh-menu__body--show");

        if (e.key && e.key === "Escape" && isMenuOpen) { //Escape key maps to keycode `27`
            closeMenu();
        } else if (e.keyCode && e.keyCode === 27 && isMenuOpen) { //Support IE11
            closeMenu();
        }
    });

    $menuBody.on("click", ".rh-menu__item-button", function (e) {
        e.stopPropagation();

        var $menuItemButton = $(this),
            $menuItemSubContainer = $("#sub" + $menuItemButton.attr('id')),  // Menu item's sub container ID
            $menuItemIsLevel1 = false,
            $menuItemLink = $(this).closest("div[class^='rh-menu__item']").find("a");

        if ($menuItemButton.hasClass("rh-menu__item-button-parent")) {
            $menuItemIsLevel1 = true;
        }

        $menuItemButton.find("span").toggleClass("icon-plus icon-minus");

        if (!$menuItemIsLevel1) {
            $menuItemButton.toggleClass("rh-menu__item-button-sub-item rh-menu__item-button-sub-item--active");
            $menuItemLink.toggleClass("rh-menu__link--active");
        }

        // Slide down
        if ($menuItemSubContainer.length) {
            $menuItemSubContainer.toggleClass("rh-menu__item-sub-container--open");
        }
    });

    // When the user clicks outside of the menu
    $(document).on('mouseup touchstart', function (e) {
        e.stopPropagation();

        if ($(e.target).closest($menuBody).length === 0 &&
            $menuOverlay.hasClass('rh-dp--show')) {
            closeMenu();
        }
    });

    function closeMenu() {
        $menuTopBar
            .removeClass('rh-pos--fixed')
            .css({
                "width": "",
                "max-width": "",
                "padding-right": $menuMainButtonDefaultPaddingRight
            });

        $('#rh-menu-body').removeClass('rh-menu__body--show');
        hideMenuBody();

        $menuBodyOffsetTop.css({ "height": $menuBodySpaceTop });
        $menuOverlay.toggleClass('rh-dp--none rh-dp--show');
    }

    var menuBodyHiddenTimer;
    var menuScrollbarShowingTimer;
    function hideMenuBody() {
        menuScrollbarShowingTimer && clearTimeout(menuScrollbarShowingTimer);
        menuScrollbarShowingTimer = setTimeout(function () {
            menuLockBodyScrolling(false);
        }, 160);

        menuBodyHiddenTimer && clearTimeout(menuBodyHiddenTimer);
        menuBodyHiddenTimer = setTimeout(function () {
            $('#rh-menu-body')
                .removeClass('rh-pos--absolute rh-dp--show')
                .addClass('rh-pos--fixed rh-dp--none');
        }, 600);
    }

    function menuLockBodyScrolling(status, fnCallback) {
        //github.com/willmcpo/body-scroll-lock
        var disableBodyScroll = bodyScrollLock.disableBodyScroll,
            enableBodyScroll = bodyScrollLock.enableBodyScroll;

        var targetElement = document.querySelector(".rh-menu__body");

        if (status) {
            $body.addClass("rh-noscroll").css({ "margin-right": scrollbarWidth });
            isIDevice && disableBodyScroll(targetElement);
        } else {
            $body.removeClass("rh-noscroll").css({ "margin-right": "" });
            isIDevice && enableBodyScroll(targetElement);
        }

        typeof fnCallback === 'function' && fnCallback();
    }
});

"use strict";
"use strict";

function toggleMenu() {
  document.getElementById("myDropdown").classList.toggle("rh-filter-show");
  document.getElementById("dropdownBtn").classList.toggle("rh-filter-active");
}

function selectItem(sel) {
  document.getElementById("dropdownBtn").classList.toggle("rh-filter-active");
  document.getElementById("dropdownBtn").style.color = "black";
  document.getElementById("myDropdown").classList.toggle("rh-filter-show");
  var text = document.getElementById("dropdownBtn").firstChild;
  text.data = sel.innerText;
} // Close the dropdown menu if the user clicks outside of it


window.onclick = function (event) {
  if (!event.target.matches('.rh-filter')) {
    var dropdowns = document.getElementsByClassName("rh-filter-menu");
    var i;

    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];

      if (openDropdown.classList.contains('rh-filter-show')) {
        openDropdown.classList.remove('rh-filter-show');
      }
    }

    var btn = document.getElementsByClassName("rh-filter");
    var i;

    for (i = 0; i < btn.length; i++) {
      var activeBtn = btn[i];

      if (activeBtn.classList.contains('rh-filter-active')) {
        activeBtn.classList.remove('rh-filter-active');
      }
    }
  }
};
"use strict";
"use strict";

var acc = document.getElementsByClassName("rh-accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("rh-accordion-active");
    var panel = this.nextElementSibling;

    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 100 + "px";
    }
  });
}
"use strict";

$("#menu-dropdown-anchor").length && $(document).ready(function () {
  // Global variables
  var gbTimer; // Global timer is using for menu delaying

  var scrollbarWidth = calculateScrollbarWidth(),
      isMenuPositionTypeFixed = false,
      menuLastPosition = 0,
      menuDelayTime = 30,
      isMinimize = false;
  var onloadScreenSize = $(document).width(),
      maxScreenSizeForDisplaying = 767,
      // 767px
  isMobileScreen = onloadScreenSize <= maxScreenSizeForDisplaying; // Menu's element definitions

  var $menuDropDownAnchorId = $("#menu-dropdown-anchor"),
      $menuSpacingAfter = $(".rh-menu-dropdown__spacing-after"),
      $menuDropDown = $(".rh-menu-dropdown"),
      $menuDropDownHeader = $(".rh-menu-dropdown__header"),
      $menuDropDownBody = $(".rh-menu-dropdown__body"),
      $menuDropDownSubContainers = $(".rh-menu-dropdown__item__sub-container"),
      $menuSubItemIcons = $(".rh-menu-dropdown__icon-item"); // Initial state for the menu when JS is activated in web browser

  $menuDropDownBody.addClass("rh-display--none");
  $menuDropDownSubContainers.addClass("rh-display--none");
  $menuSubItemIcons.toggleClass("icon-minus icon-plus"); // Check screen size

  $(window).resize(function () {
    scrollbarWidth = calculateScrollbarWidth();

    if ($(document).width() <= maxScreenSizeForDisplaying) {
      if (!isMobileScreen) {
        isMobileScreen = true;
      }
    } else {
      if (isMobileScreen) {
        isMobileScreen = false;
      }
    }
  }); // EventListener for the menu

  $(window).scroll(function () {
    if (isMobileScreen) {
      // Determine the menu's type (fixed or relative)
      var menuPosInfo = getElementTopById($menuDropDownAnchorId);

      if (menuPosInfo.isOverViewport) {
        changeToFixedPosition(true, function () {
          $menuDropDownHeader.addClass("rh-menu-dropdown__header--shadow");
        });
      } else {
        changeToFixedPosition(false, function () {
          $menuDropDown.css({
            "top": 0
          });
          $menuDropDownHeader.removeClass("rh-menu-dropdown__header--shadow");
        });
      } // Minimize the menu when scrolling down/up for a better user experience


      var menuCurrentPosition = $(this).scrollTop(),
          menuSpacingAfterPosInfo = getElementTopById($menuSpacingAfter),
          menuOffset = $menuSpacingAfter.height() * -1; // Scroll up

      if (menuCurrentPosition < menuLastPosition) {
        if (isMinimize) {
          delayNow(function () {
            $menuDropDownHeader.removeClass("rh-menu-dropdown__header--minimize");
            isMinimize = !isMinimize;
          }, menuDelayTime);
        }
      } // Scroll down
      else if (menuCurrentPosition > menuLastPosition) {
          if (!isMinimize && menuPosInfo.isOverViewport && menuSpacingAfterPosInfo.viewportTop <= menuOffset) {
            delayNow(function () {
              $menuDropDownHeader.addClass("rh-menu-dropdown__header--minimize");
              isMinimize = !isMinimize;
            }, menuDelayTime);
          }
        }

      menuLastPosition = menuCurrentPosition;
    }
  }); // Main menu button

  $(".rh-menu-dropdown__menu-round-button").click(function () {
    $(this).toggleClass("rh-menu-dropdown__menu-round-button--open").find(".rh-menu-dropdown__icon-menu").toggleClass("icon-x icon-menu");
    $menuDropDown.toggleClass("rh-menu-dropdown--open");
    $menuDropDownBody.toggleClass("rh-display--none rh-display--show");
    /* Enhanced */

    var menuCurrentPosInfo = getElementTopById($menuDropDownAnchorId);

    if ($menuDropDownBody.is(":visible")) {
      // Menu is opened
      if (menuCurrentPosInfo.isOverViewport) {
        lockBodyScrolling(true, makeScrollBarOffset(true));
      } else {
        // Menu is on top
        //-> Change position from "relative" to "fixed" by add fixed-class
        var topPos = menuCurrentPosInfo.bodyTop ? menuCurrentPosInfo.viewportTop : // Offset for above elements
        menuCurrentPosInfo.onTop;
        changeToFixedPosition(true, function () {
          $menuDropDown.css({
            "top": topPos
          });
          lockBodyScrolling(true, makeScrollBarOffset(true));
        });
      }
    } else {
      // Menu is closed - Reset all to default
      if (menuCurrentPosInfo.isOverViewport) {
        lockBodyScrolling(false, makeScrollBarOffset(false));
      } else {
        // Menu is on top
        //-> Change back position from "fixed" to "relative" by remove fixed-class
        changeToFixedPosition(false, function () {
          $menuDropDown.css({
            "top": 0
          });
          lockBodyScrolling(false, makeScrollBarOffset(false));
        });
      }
    }
  }); // Item button

  $(".rh-menu-dropdown__item-round-button").click(function () {
    var $menuItemButton = $(this),
        $menuItemSubContainer = $("#sub" + $menuItemButton.attr('id')); // Menu item's sub container ID

    $menuItemButton.toggleClass("rh-menu-dropdown__item-round-button--open").find(".rh-menu-dropdown__icon-item").toggleClass("icon-minus icon-plus");
    $menuItemSubContainer.toggleClass("rh-display--none rh-display--show");
  }); // Item link

  $(".rh-menu-dropdown__body a").click(function () {
    var menuItemClassName = "rh-menu-dropdown__item"; // Reset all and only the latest clicked item is activated

    $(".rh-menu-dropdown__item--active").removeClass("rh-menu-dropdown__item--active");
    $(this).closest("div[class^='" + menuItemClassName + "']").addClass("rh-menu-dropdown__item--active");
  });
  /* Common functions */

  function changeToFixedPosition(status, fnCallback) {
    var done = false;

    if (status && !isMenuPositionTypeFixed) {
      $menuDropDown.addClass("rh-position-fixed");
      $menuSpacingAfter.addClass("rh-menu-dropdown__spacing-after--active");
      isMenuPositionTypeFixed = !isMenuPositionTypeFixed;
      done = true;
    } else if (!status && isMenuPositionTypeFixed) {
      $menuDropDown.removeClass("rh-position-fixed");
      $menuSpacingAfter.removeClass("rh-menu-dropdown__spacing-after--active");
      isMenuPositionTypeFixed = !isMenuPositionTypeFixed;
      done = true;
    }

    done && typeof fnCallback === 'function' && fnCallback();
  }

  function lockBodyScrolling(status, fnCallback) {
    // bodyScrollLock exported from the library Body scroll block (//github.com/willmcpo/body-scroll-lock)
    var disableBodyScroll = bodyScrollLock.disableBodyScroll,
        enableBodyScroll = bodyScrollLock.enableBodyScroll;
    var targetElement = document.querySelector(".rh-menu-dropdown");

    if (status) {
      $("body").addClass("rh-noscroll");
      disableBodyScroll(targetElement);
    } else {
      $("body").removeClass("rh-noscroll");
      enableBodyScroll(targetElement);
    }

    typeof fnCallback === 'function' && fnCallback();
  }

  function makeScrollBarOffset(status) {
    if (status) {
      $("body").css({
        "margin-right": scrollbarWidth
      });
    } else {
      $("body").css({
        "margin-right": ""
      }); // Reset to default
    }
  }

  function delayNow(fnCallback, millisecond) {
    // Using gbTimer variable on global
    if (gbTimer) clearTimeout(gbTimer);

    if (typeof fnCallback === 'function') {
      gbTimer = setTimeout(fnCallback, millisecond);
    }
  }
  /* Helpers */


  function getElementTopById($elementId) {
    if (!$elementId) {
      throw new Error("$element ID is missing");
    }

    var bodyTop = $(window).scrollTop(),
        elementTop = $elementId.position().top,
        viewportTop = elementTop - bodyTop,
        isOverViewportTop = bodyTop >= elementTop;
    return {
      bodyTop: bodyTop,
      onTop: elementTop,
      viewportTop: viewportTop,
      isOverViewport: isOverViewportTop
    };
  }

  function calculateScrollbarWidth() {
    return window.innerWidth - $(document).width();
  }
});
"use strict";

var videoPlayButton,
    videoWrapper = document.getElementsByClassName('rh-video')[0],
    video = document.getElementsByTagName('video')[0],
    videoMethods = {
  renderVideoPlayButton: function renderVideoPlayButton() {
    if (videoWrapper !== undefined && videoWrapper.contains(video)) {
      this.formatVideoPlayButton();
      video.classList.add('has-media-controls-hidden');
      videoPlayButton = document.getElementsByClassName('video-button')[0];
      videoPlayButton.addEventListener('click', this.hideVideoPlayButton);
    }
  },
  formatVideoPlayButton: function formatVideoPlayButton() {
    videoWrapper.insertAdjacentHTML('beforeend', '\
            <div class="video-button"><div class="video-button-content"> <i class="feather icon-play"></i> </div></div>\
            ');
  },
  hideVideoPlayButton: function hideVideoPlayButton() {
    video.play();
    videoPlayButton.classList.add('is-hidden');
    video.classList.remove('has-media-controls-hidden');
    video.setAttribute('controls', 'controls');
  }
};
videoMethods.renderVideoPlayButton();
"use strict";

var acc = document.getElementsByClassName("rh-search-accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("rh-search-active");
    var panel = this.nextElementSibling;

    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 100 + "px";
    }
  });
}
"use strict";

window.onload = function () {
  var table, rows, i, x, y;
  table = document.getElementById("rh-table");

  if (table) {
    rows = table.rows;

    for (var i = 1, row; row = rows[i]; i++) {
      for (var j = 0, col; col = row.cells[j]; j++) {
        x = rows[i].getElementsByTagName("TD")[j];

        if (x.innerText.length > 20) {
          x.classList.add('show-icon');
        }
      }
    }
  }
};

function sortByName() {
  var table,
      rows,
      switching,
      i,
      x,
      y,
      shouldSwitch,
      dir,
      switchcount = 0;
  table = document.getElementById("rh-table");
  switching = true;
  dir = "asc";

  while (switching) {
    switching = false;
    rows = table.getElementsByTagName("TR");

    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[1];
      y = rows[i + 1].getElementsByTagName("TD")[1];
      var xContent = isNaN(x.innerHTML) ? x.innerHTML.toLowerCase() === '-' ? 0 : x.innerHTML.toLowerCase() : parseFloat(x.innerHTML);
      var yContent = isNaN(y.innerHTML) ? y.innerHTML.toLowerCase() === '-' ? 0 : y.innerHTML.toLowerCase() : parseFloat(y.innerHTML);

      if (dir == "asc") {
        if (xContent > yContent) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (xContent < yContent) {
          shouldSwitch = true;
          break;
        }
      }
    }

    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

function expand() {
  var rows = document.getElementById('rh-table').rows;

  for (var row = 0; row < rows.length; row++) {
    var cols = rows[row].cells;

    if (2 >= 0 && 2 < cols.length) {
      cols[2].classList.toggle("selected");
    }
  }
}

function setShadow() {
  var rows = document.getElementById('rh-table').rows;

  for (var row = 0; row < rows.length; row++) {
    var cols = rows[row].cells;

    if (0 >= 0 && 0 < cols.length) {
      cols[0].classList.add("rh-table-cell--shadow");
    }
  }
}
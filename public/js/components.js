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

var videoPlayButton,
    videoWrapper = document.getElementsByClassName('rh-video')[0],
    video = document.getElementsByTagName('video')[0],
    videoMethods = {
  renderVideoPlayButton: function renderVideoPlayButton() {
    if (videoWrapper.contains(video)) {
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

//look ES6!!
var onBtnClick = function onBtnClick(element) {
  element.innerHTML = 'You did it! 👍';
  console.log('tadaa');
};
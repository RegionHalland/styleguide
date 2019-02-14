"use strict";

var videoPlayButton,
    videoWrapper = document.getElementsByClassName('rh-video-wrapper')[0],
    video = document.getElementsByTagName('video')[0],
    videoMethods = {
  renderVideoPlayButton: function renderVideoPlayButton() {
    if (videoWrapper.contains(video)) {
      this.formatVideoPlayButton();
      video.classList.add('has-media-controls-hidden');
      videoPlayButton = document.getElementsByClassName('video-overlay-play-button')[0];
      videoPlayButton.addEventListener('click', this.hideVideoPlayButton);
    }
  },
  formatVideoPlayButton: function formatVideoPlayButton() {
    videoWrapper.insertAdjacentHTML('beforeend', '\
                <svg class="video-overlay-play-button" viewBox="0 0 200 200" alt="Play video">\
                    <circle cx="100" cy="100" r="90" />\
                    <polygon points="70, 55 70, 145 145, 100" fill="#fff"/>\
                </svg>\
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
/*
<svg class="video-overlay-play-button" viewBox="0 0 200 200" alt="Play video">\
    <circle cx="100" cy="100" r="90" />\
    <polygon points="70, 55 70, 145 145, 100" fill="#fff"/>\
</svg>



<span class="fa-stack fa-4x">
  <i class="fa fa-circle fa-stack-2x icon-background"></i>
  <i class="fa fa-lock fa-stack-1x"></i>
</span>

*/
"use strict";

//look ES6!!
var onBtnClick = function onBtnClick(element) {
  element.innerHTML = 'You did it! 👍';
  console.log('tadaa');
};
"use strict";
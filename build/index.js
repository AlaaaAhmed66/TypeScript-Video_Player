"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Video {
    constructor(options) {
        var _a, _b, _c, _d;
        Video.count++;
        this._url = options.url;
        this._iconsColor = (_a = options.iconsColor) !== null && _a !== void 0 ? _a : "white";
        this._BgColor = (_b = options.BgColor) !== null && _b !== void 0 ? _b : "white";
        this._skipTime = (_c = options.skipTime) !== null && _c !== void 0 ? _c : 10;
        this._autoPlay = (_d = options.autoPlay) !== null && _d !== void 0 ? _d : false;
        let parent = document.getElementsByClassName("row")[0];
        let div = document.createElement("div");
        div.classList.add("col-lg-10", "m-auto", "my-4", "bg-dark", "videoContainer");
        div.innerHTML = `
        <video class="w-100" id="video">
            <source src=${this._url} type="video/mp4" />
          </video>
        <div class="controls px-1">
          <input type="range" class="w-100 timeRange" value="0" />
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex justify-content-between align-items-center">
              <i class="fa-solid fa-backward me-2 backwardBtn"></i>
              <i class="fa-solid fa-play me-3" id="play"></i>
              <i class="fa-solid fa-forward forwardBtn"></i>
              <span class="time-display px-2" id="time-display">00:00</span>
              <i class="fa-solid fa-volume-high mx-2" id="muteBtn"></i>
              <div class="volume">
                <input type="range" value="1" min="0" max="1" step=".1" />
              </div>
            </div>
           <div>
              <i class="fa-solid fa-expand mx-1 full-screen"></i>
            </div>
          </div>
        </div>
        `;
        parent === null || parent === void 0 ? void 0 : parent.appendChild(div);
        this.playAndPause(this._iconsColor);
        this.updateTime(this._iconsColor);
        this.forwardSeconds(this._skipTime, this._iconsColor);
        this.backSeconds(this._skipTime, this._iconsColor);
        this.muted(this._iconsColor);
        this.fullScreen(this._BgColor, this._iconsColor);
        this.autoPlay(this._autoPlay);
    }
    /********************************************************** */
    //play and pause video
    playAndPause(_iconsColor) {
        const video = document.querySelectorAll("#video")[Video.count];
        const playBtn = document.querySelectorAll("#play")[Video.count];
        playBtn.style.color = _iconsColor;
        playBtn === null || playBtn === void 0 ? void 0 : playBtn.addEventListener("click", function () {
            if (video === null || video === void 0 ? void 0 : video.paused) {
                playBtn.classList.remove("fa-play");
                playBtn.classList.add("fa-pause");
                video.play();
            }
            else {
                video === null || video === void 0 ? void 0 : video.pause();
                playBtn.classList.remove("fa-pause");
                playBtn.classList.add("fa-play");
            }
        });
    }
    /*********************************************************** */
    //update time of video
    updateTime(_iconsColor) {
        const video = document.querySelectorAll("#video")[Video.count];
        const timeRange = document.getElementsByClassName("timeRange")[Video.count];
        const timeDisplay = document.getElementsByClassName("time-display")[Video.count];
        timeDisplay.style.color = _iconsColor;
        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
        }
        function updateTimeDisplay() {
            const currentTime = formatTime(video.currentTime);
            const durationTime = formatTime(video.duration || 0);
            timeDisplay.textContent = `${currentTime} / ${durationTime}`;
        }
        video.addEventListener("timeupdate", function () {
            const progress = (video.currentTime / video.duration) * 100;
            timeRange.value = String(progress || 0);
            updateTimeDisplay();
        });
        timeRange.addEventListener("input", function () {
            const time = (parseFloat(timeRange.value) / 100) * video.duration;
            video.currentTime = time;
        });
        video.addEventListener("loadedmetadata", function () {
            timeRange.value = "0";
            updateTimeDisplay();
        });
    }
    /******************************************************** */
    //forward video more second
    forwardSeconds(_skipTime, _iconsColor) {
        const video = document.querySelectorAll("#video")[Video.count];
        const forwardBtn = document.getElementsByClassName("forwardBtn")[Video.count];
        forwardBtn.style.color = _iconsColor;
        forwardBtn.addEventListener("click", function () {
            if (video) {
                if (video.currentTime + _skipTime > video.duration) {
                    video.currentTime = video.duration;
                }
                else {
                    video.currentTime += _skipTime;
                }
            }
        });
    }
    /********************************************************* */
    //backward video more seconds
    backSeconds(_skipTime, _iconsColor) {
        const video = document.querySelectorAll("#video")[Video.count];
        const backBtn = document.getElementsByClassName("backwardBtn")[Video.count];
        backBtn.style.color = _iconsColor;
        backBtn === null || backBtn === void 0 ? void 0 : backBtn.addEventListener("click", function () {
            if (video) {
                if (video.currentTime - _skipTime < 0) {
                    video.currentTime = 0;
                }
                else {
                    video.currentTime -= _skipTime;
                }
            }
        });
    }
    /*********************************************************** */
    // make video muted 
    muted(_iconsColor) {
        var _a;
        const video = document.querySelectorAll("#video")[Video.count];
        const muteBtn = document.querySelectorAll("#muteBtn")[Video.count];
        const volumeContainer = document.getElementsByClassName("volume")[Video.count];
        const volume = (_a = document.getElementsByClassName("volume")[Video.count]) === null || _a === void 0 ? void 0 : _a.children[0];
        muteBtn.style.color = _iconsColor;
        volume.style.color = _iconsColor;
        volumeContainer.style.display = "none";
        volumeContainer.style.backgroundColor = "transparent";
        volumeContainer.style.padding = "4px 4px 0px 4px";
        volumeContainer.style.borderRadius = " 8px";
        volumeContainer.style.position = "relative";
        volumeContainer.style.right = "10px";
        volumeContainer.style.bottom = "3px";
        muteBtn.addEventListener("click", function () {
            if (video.muted) {
                video.muted = false;
                muteBtn.classList.remove("fa-volume-xmark");
                muteBtn.classList.add("fa-volume-high");
                volume.value = "1";
            }
            else {
                muteBtn.classList.remove("fa-volume-high");
                muteBtn.classList.add("fa-volume-xmark");
                video.muted = true;
                volume.value = "0";
            }
        });
        muteBtn === null || muteBtn === void 0 ? void 0 : muteBtn.addEventListener("mouseover", function () {
            volumeContainer.style.display = "block";
            volume.style.display = "block";
        });
        muteBtn === null || muteBtn === void 0 ? void 0 : muteBtn.addEventListener("mouseleave", function () {
            volumeContainer.style.display = "none";
        });
        volumeContainer === null || volumeContainer === void 0 ? void 0 : volumeContainer.addEventListener("mouseover", function () {
            this.style.display = "block";
        });
        volumeContainer === null || volumeContainer === void 0 ? void 0 : volumeContainer.addEventListener("mouseleave", function () {
            this.style.display = "none";
        });
        volume === null || volume === void 0 ? void 0 : volume.addEventListener("input", function () {
            if (parseFloat(volume === null || volume === void 0 ? void 0 : volume.value) == 0) {
                muteBtn === null || muteBtn === void 0 ? void 0 : muteBtn.classList.remove("fa-volume-high");
                muteBtn === null || muteBtn === void 0 ? void 0 : muteBtn.classList.add("fa-volume-xmark");
            }
            if (parseFloat(volume === null || volume === void 0 ? void 0 : volume.value) > 0) {
                muteBtn === null || muteBtn === void 0 ? void 0 : muteBtn.classList.remove("fa-volume-xmark");
                muteBtn === null || muteBtn === void 0 ? void 0 : muteBtn.classList.add("fa-volume-high");
            }
            video.volume = parseFloat(volume === null || volume === void 0 ? void 0 : volume.value);
        });
    }
    /**************************************************************************** */
    //make video full screen
    fullScreen(_BgColor, _iconsColor) {
        const fullScreen = document.getElementsByClassName("full-screen")[Video.count];
        const controls = document.getElementsByClassName("controls")[Video.count];
        const videoContainer = document.getElementsByClassName("videoContainer")[Video.count];
        controls.style.backgroundColor = _BgColor;
        fullScreen.style.color = _iconsColor;
        fullScreen === null || fullScreen === void 0 ? void 0 : fullScreen.addEventListener("click", function () {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    if (!document.fullscreenElement) {
                        if (videoContainer) {
                            videoContainer.style.position = "relative";
                            controls.style.position = "absolute";
                            controls.style.bottom = "0px";
                            controls.style.zIndex = "1";
                            controls.style.width = "99%";
                            yield videoContainer.requestFullscreen();
                        }
                    }
                    else {
                        videoContainer.style.position = "relative";
                        controls.style.position = "absolute";
                        controls.style.bottom = "5px";
                        controls.style.zIndex = "1";
                        controls.style.width = "98%";
                        yield document.exitFullscreen();
                    }
                }
                catch (err) {
                    console.error("errors to changed screen", err);
                }
            });
        });
    }
    /************************************************************************** */
    //auto play video
    autoPlay(_autoPlay) {
        const video = document.querySelectorAll("#video")[Video.count];
        const playBtn = document.querySelectorAll("#play")[Video.count];
        if (_autoPlay === true) {
            video.autoplay = true;
            playBtn.classList.remove("fa-play");
            playBtn.classList.add("fa-pause");
        }
    }
}
Video.count = -1;
/*************************************************************************************** */
let video1 = new Video({
    url: "./Tom&Jerry.mp4",
    BgColor: "black",
    skipTime: 5,
});
let video2 = new Video({
    url: "./ShaunTheSheep.mp4",
    iconsColor: "orange",
    autoPlay: true,
});
let video3 = new Video({
    url: "./SpongeBobSquarePants.mp4",
    BgColor: "yellow",
    iconsColor: "gray",
    skipTime: 3,
});

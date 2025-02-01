class Video {
  private _url: string;
  private _iconsColor: string;
  private _BgColor: string;
  private _skipTime: number;
  private _autoPlay: boolean;
  private static count = -1;

  constructor(options: {
    url: string;
    iconsColor?: string;
    BgColor?: string;
    skipTime?: number;
    autoPlay?: boolean;
  }) {
    Video.count++;
    this._url = options.url;
    this._iconsColor = options.iconsColor ?? "white";
    this._BgColor = options.BgColor ?? "white";
    this._skipTime = options.skipTime ?? 10;
    this._autoPlay = options.autoPlay ?? false;

    let parent = document.getElementsByClassName("row")[0];
    let div = document.createElement("div");
    div.classList.add(
      "col-lg-10",
      "m-auto",
      "my-4",
      "bg-dark",
      "videoContainer"
    );
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
    parent?.appendChild(div);
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
  public playAndPause(_iconsColor: string) {
    const video = document.querySelectorAll("#video")[
      Video.count
    ] as HTMLVideoElement;
    const playBtn = document.querySelectorAll("#play")[
      Video.count
    ] as HTMLElement;

    playBtn.style.color = _iconsColor;

    playBtn?.addEventListener("click", function () {
      if (video?.paused) {
        playBtn.classList.remove("fa-play");
        playBtn.classList.add("fa-pause");
        video.play();
      } else {
        video?.pause();
        playBtn.classList.remove("fa-pause");
        playBtn.classList.add("fa-play");
      }
    });
  }

  /*********************************************************** */
  //update time of video
  public updateTime(_iconsColor:string) {
    const video = document.querySelectorAll("#video")[
      Video.count
    ] as HTMLVideoElement;
    const timeRange = document.getElementsByClassName("timeRange")[
      Video.count
    ] as HTMLInputElement;
    const timeDisplay = document.getElementsByClassName("time-display")[
      Video.count
    ] as HTMLSpanElement;

    timeDisplay.style.color = _iconsColor

    function formatTime(seconds: number): string {
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
  public forwardSeconds(_skipTime: number, _iconsColor: string) {
    const video = document.querySelectorAll("#video")[
      Video.count
    ] as HTMLVideoElement;
    const forwardBtn = document.getElementsByClassName("forwardBtn")[
      Video.count
    ] as HTMLButtonElement;

    forwardBtn.style.color = _iconsColor;

    forwardBtn.addEventListener("click", function () {
      if (video) {
        if (video.currentTime + _skipTime > video.duration) {
          video.currentTime = video.duration;
        } else {
          video.currentTime += _skipTime;
        }
      }
    });
  }

  /********************************************************* */

  //backward video more seconds
  public backSeconds(_skipTime: number, _iconsColor: string) {
    const video = document.querySelectorAll("#video")[
      Video.count
    ] as HTMLVideoElement;
    const backBtn = document.getElementsByClassName("backwardBtn")[
      Video.count
    ] as HTMLButtonElement;

    backBtn.style.color = _iconsColor;

    backBtn?.addEventListener("click", function () {
      if (video) {
        if (video.currentTime - _skipTime < 0) {
          video.currentTime = 0;
        } else {
          video.currentTime -= _skipTime;
        }
      }
    });
  }

  /*********************************************************** */

  // make video muted 
  public muted(_iconsColor: string) {
    const video = document.querySelectorAll("#video")[
      Video.count
    ] as HTMLVideoElement;
    const muteBtn = document.querySelectorAll("#muteBtn")[
      Video.count
    ] as HTMLButtonElement;
    const volumeContainer = document.getElementsByClassName("volume")[
      Video.count
    ] as HTMLElement;
    const volume = document.getElementsByClassName("volume")[Video.count]
      ?.children[0] as HTMLInputElement;

    muteBtn.style.color = _iconsColor;
    volume.style.color = _iconsColor;
    volumeContainer.style.display = "none";
    volumeContainer.style.backgroundColor = "transparent";
    volumeContainer.style.padding = "4px 4px 0px 4px";
    volumeContainer.style.borderRadius = " 8px";
    volumeContainer.style.position = "relative";
    volumeContainer.style.right = "10px" ;
    volumeContainer.style.bottom = "3px" ;

    muteBtn.addEventListener("click", function () {
      if (video.muted) {
        video.muted = false;
        muteBtn.classList.remove("fa-volume-xmark");
        muteBtn.classList.add("fa-volume-high");
        volume!.value = "1";
      } else {
        muteBtn.classList.remove("fa-volume-high");
        muteBtn.classList.add("fa-volume-xmark");
        video.muted = true;
        volume!.value = "0";
      }
    });

    muteBtn?.addEventListener("mouseover", function () {
      volumeContainer!.style.display = "block";
      volume!.style.display = "block";
    });
    muteBtn?.addEventListener("mouseleave", function () {
      volumeContainer!.style.display = "none";
    });

    volumeContainer?.addEventListener("mouseover", function () {
      this.style.display = "block";
    });
    volumeContainer?.addEventListener("mouseleave", function () {
      this.style.display = "none";
    });

    volume?.addEventListener("input", function () {
      if (parseFloat(volume?.value) == 0) {
        muteBtn?.classList.remove("fa-volume-high");
        muteBtn?.classList.add("fa-volume-xmark");
      }
      if (parseFloat(volume?.value) > 0) {
        muteBtn?.classList.remove("fa-volume-xmark");
        muteBtn?.classList.add("fa-volume-high");
      }

      video!.volume = parseFloat(volume?.value);
    });
  }

  /**************************************************************************** */

  //make video full screen
  public fullScreen(_BgColor: string, _iconsColor: string) {
    const fullScreen = document.getElementsByClassName("full-screen")[
      Video.count
    ] as HTMLElement;
    const controls = document.getElementsByClassName("controls")[
      Video.count
    ] as HTMLElement;
    const videoContainer = document.getElementsByClassName("videoContainer")[
      Video.count
    ] as HTMLElement;

    controls.style.backgroundColor = _BgColor;
    fullScreen.style.color = _iconsColor;

    fullScreen?.addEventListener("click", async function () {
      try {
        if (!document.fullscreenElement) {
          if (videoContainer) {
            videoContainer.style.position = "relative" ;
            controls.style.position = "absolute";
            controls.style.bottom = "0px";
            controls.style.zIndex = "1";
            controls.style.width = "99%";
            await videoContainer.requestFullscreen();
          }
        } else {
            videoContainer.style.position = "relative" ;
            controls.style.position = "absolute";
            controls.style.bottom = "5px";
            controls.style.zIndex = "1";
            controls.style.width = "98%";
          await document.exitFullscreen();
        }
      } catch (err) {
        console.error("errors to changed screen", err);
      }
    });
  }
  /************************************************************************** */

  //auto play video
  public autoPlay(_autoPlay: boolean) {
    const video = document.querySelectorAll("#video")[
      Video.count
    ] as HTMLVideoElement;
    const playBtn = document.querySelectorAll("#play")[
      Video.count
    ] as HTMLElement;

    if (_autoPlay === true) {
      video.autoplay = true;
      playBtn.classList.remove("fa-play");
      playBtn.classList.add("fa-pause");
    }
  }
}

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

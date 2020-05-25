const meditate = () => {
    const replay = document.querySelector(".replay")
    const song = document.querySelector(".song")
    const play = document.querySelector(".play")
    const video = document.querySelector("video")

    const sounds = document.querySelectorAll(".sound-picker button")
    const timeDisplay = document.querySelector(".time-display")
    const timeSelect = document.getElementById("mySelect");
    let setTime = 60;
      
    sounds.forEach(sound => {
        sound.addEventListener("click", function() {
          song.src = this.getAttribute("data-sound");
          video.src = this.getAttribute("data-video");
          checkPlaying(song);
        });
      });
    
    
    replay.addEventListener("click", function() {
        restartSong(song);
    });

    play.addEventListener("click", function() {
        checkPlaying(song);
    });

    timeSelect.onchange = function(event){
        setTime = event.target.options[event.target.selectedIndex].dataset.time;
        timeDisplay.textContent = `${Math.floor(setTime / 60)}:${Math.floor(
            setTime % 60
        )}`;
    };

      
    const checkPlaying = song => {
        if (song.paused) {
          song.play();
          play.src = "../svg/pause-circle.svg";
          video.play();
        } else {
          song.pause();
          play.src = "../svg/play-circle.svg";
          video.pause();
        }
      };
    
    song.ontimeupdate = function() {
        let zero = ''
        let currentTime = song.currentTime;
        let seconds = Math.floor((setTime - currentTime) % 60);
        let minutes = Math.floor((setTime - currentTime) / 60);
        if(seconds.toString().length == 1) {
            zero = '0';
        }
        timeDisplay.textContent = `${minutes}:${ zero + seconds}`;
        if (currentTime >= setTime) {
            song.pause();
            song.currentTime = 0;
            play.src = "../svg/play-circle.svg";
            video.pause();
        }
    }

    const restartSong = song =>{
        song.currentTime = 0;
    }
}

meditate(); 

// recieved idea and some guidance from https://www.youtube.com/watch?v=oMBXdZzYqEk
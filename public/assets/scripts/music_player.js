document.addEventListener('DOMContentLoaded', () => {
  initializePlayers();
});

function initializePlayers() {
  const players = document.querySelectorAll('.audio-player');

  players.forEach(player => {
    const audio = player.querySelector('.audio');
    const seekBar = player.querySelector('.seek-bar');
    const currentTime = player.querySelector('.current-time');
    const duration = player.querySelector('.duration');

    const playPauseBtn = player.querySelector('.play-pause');
    const playPauseIcon = player.querySelector('.play-pause-icon');

    const muteBtn = player.querySelector('.mute');
    const muteIcon = player.querySelector('.mute-icon');

    const volumeControl = player.querySelector('.vol-control');

    const downloadBtn = player.querySelector('.download');

    playPauseBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play();
        playPauseIcon.src =
          './assets/images/icons/media-playback-stop.png';
      } else {
        audio.pause();
        playPauseIcon.src =
          './assets/images/icons/media-playback-start.png';
      }
    });

    audio.addEventListener('timeupdate', () => {
      const value = (audio.currentTime / audio.duration) * 100;

      seekBar.value = value || 0;

      currentTime.textContent = formatTime(audio.currentTime);
      duration.textContent = formatTime(audio.duration);
    });

    seekBar.addEventListener('input', () => {
      audio.currentTime =
        (seekBar.value / 100) * audio.duration;
    });

    volumeControl.addEventListener('input', () => {
      audio.volume = volumeControl.value;
    });

    muteBtn.addEventListener('click', () => {
      audio.muted = !audio.muted;

      muteIcon.src = audio.muted
        ? './assets/images/icons/audio-volume-muted.png'
        : './assets/images/icons/speaker.png';
    });

    downloadBtn.addEventListener('click', () => {
      const source = audio.querySelector('source');

      if (!source) return;

      const a = document.createElement('a');

      a.href = source.src;
      a.download = source.src.split('/').pop();

      document.body.appendChild(a);

      a.click();

      document.body.removeChild(a);
    });
  });
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);

  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  return `${minutes}:${seconds}`;
}

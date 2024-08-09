// cusotm audio player

function getTimeCodeFromNum(num) {
  let seconds = parseInt(num)
  let minutes = parseInt(seconds / 60)
  seconds -= minutes * 60
  const hours = parseInt(minutes / 60)
  minutes -= hours * 60

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60,
  ).padStart(2, 0)}`
}

function initializeAudioPlayer(audioPlayer, audioUrl) {
  const audio = new Audio(audioUrl)

  audio.addEventListener(
    'loadeddata',
    () => {
      audioPlayer.querySelector(
        '.time .length',
      ).textContent = getTimeCodeFromNum(audio.duration)
      audio.volume = 0.75
    },
    false,
  )
  audio.addEventListener('play', (e) => {
    $(audioPlayer).find('.toggle-play').removeClass('play').addClass('pause')
  })
  audio.addEventListener('pause', (e) => {
    $(audioPlayer).find('.toggle-play').removeClass('pause').addClass('play')
  })

  const timeline = audioPlayer.querySelector('.timeline')
  timeline.addEventListener(
    'click',
    (e) => {
      const timelineWidth = window.getComputedStyle(timeline).width
      const timeToSeek = (e.offsetX / parseInt(timelineWidth)) * audio.duration
      audio.currentTime = timeToSeek
    },
    false,
  )

  //click volume slider to change volume
  const volumeSlider = audioPlayer.querySelector('.controls .volume-slider')
  volumeSlider.addEventListener(
    'click',
    (e) => {
      const sliderWidth = window.getComputedStyle(volumeSlider).width
      const newVolume = e.offsetX / parseInt(sliderWidth)
      audio.volume = newVolume
      audioPlayer.querySelector('.controls .volume-percentage').style.width =
        newVolume * 100 + '%'
    },
    false,
  )

  //check audio percentage and update time accordingly
  setInterval(() => {
    const progressBar = audioPlayer.querySelector('.progress')
    progressBar.style.width = (audio.currentTime / audio.duration) * 100 + '%'
    audioPlayer.querySelector(
      '.time .current',
    ).textContent = getTimeCodeFromNum(audio.currentTime)
  }, 500)

  //toggle between playing and pausing on button click

  const playBtn = audioPlayer.querySelectorAll('.toggle-play')
  playBtn.forEach(function (playerBtn) {
    playerBtn.addEventListener(
      'click',
      (e) => {
        $(audioPlayer)
          .parents('li')
          .siblings('li')
          .find('.toggle-play.pause')
          .trigger('click')
        if (audio.paused) {
          audio.play()
        } else {
          audio.pause()
        }
      },
      false,
    )
  })

  audioPlayer.querySelector('.volume-button').addEventListener('click', () => {
    const volumeEl = audioPlayer.querySelector('.volume-container .volume')
    audio.muted = !audio.muted
    if (audio.muted) {
      volumeEl.classList.remove('icono-volumeMedium')
      volumeEl.classList.add('icono-volumeMute')
    } else {
      volumeEl.classList.add('icono-volumeMedium')
      volumeEl.classList.remove('icono-volumeMute')
    }
  })

  //turn 128 seconds into 2:08

  return audio
}

// const audioUrls =  audioPlayer.attributes("data-url");
const audioPlayers = document.querySelectorAll('.audio-player')

audioPlayers.forEach((audioPlayer, index) => {
  const audio = initializeAudioPlayer(
    audioPlayer,
    $(audioPlayer).attr('data-url'),
  )
})

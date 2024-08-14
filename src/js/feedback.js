import setupCarousel from './carousel.js'

setupFeedbackCards()
setupFeedbackCarousel()

function setupFeedbackCards() {
  const cards = document.querySelectorAll('[data-feedback-card]')
  cards.forEach((card) => setupFeedbackCard(card))
}

function setupFeedbackCard(cardNode) {
  const cardAudio = cardNode.querySelector('[data-feedback-audio]')
  if (!cardAudio) {
    return
  }

  cardNode.classList.add('feedback-card_has-audio')

  cardNode.addEventListener('click', () => {
    if (cardAudio.paused) {
      pauseActiveAudio()
      cardAudio.play()
    } else {
      cardAudio.pause()
    }
  })

  cardAudio.addEventListener('play', () => {
    cardNode.classList.add('feedback-card_active')
  })

  cardAudio.addEventListener('pause', () => {
    cardNode.classList.remove('feedback-card_active')
  })

  function pauseActiveAudio() {
    const activeCard = document.querySelector(['[data-feedback-card].feedback-card_active'])
    if (!activeCard) {
      return
    }

    const activeAudio = activeCard.querySelector('[data-feedback-audio]')
    activeAudio.pause()
  }
}

function setupFeedbackCarousel() {
  const carousel = document.querySelector('[data-carousel="feedback"]')
  if (!carousel) return

  const carouselArrows = document.querySelector('[data-carousel-arrows="feedback"]')
  const carouselSlides = carousel.querySelectorAll('[data-carousel-slide]')
  const isCarouselActive = (carouselSlides.length > 4 && window.innerWidth >= 1280)
    || (carouselSlides.length > 3 && window.innerWidth < 1280)
    || (carouselSlides.length > 2 && window.innerWidth < 1024)
    || (carouselSlides.length > 1 && window.innerWidth < 768)

  if (!isCarouselActive) {
    carouselArrows.style.display = 'none'
    return
  }

  setupCarousel(
    carousel,
    {
      align: 'start',
      breakpoints: {
        '(max-width: 767px)': {
          align: 'center',
        },
      },
    },
    carouselArrows,
  )
}

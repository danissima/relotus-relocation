import setupCarousel from './carousel.js'
import { openModal, setupModal } from './modal.js'

setupFeedbackModal()
setupFeedbackCards('[data-feedback-section]', window.feedbackCards)
setupFeedbackCards('[data-team-section]', window.teamCards)
setupFeedbackCarousel()

function setupFeedbackModal() {
  const modal = document.querySelector('[data-modal="feedback"]')
  if (!modal) {
    return
  }

  setupModal(modal)

  modal.addEventListener('modal-close', async () => {
    const player = modal.querySelector('lite-youtube')
    if (player) {
      // const ytPlayer = await player.getYTPlayer();
      // ytPlayer.stopVideo()
      player.remove()
    }
  })
}

function setupFeedbackCards(containerSelector, windowCards) {
  const container = document.querySelector(containerSelector)
  if (!container || !windowCards?.length) {
    return
  }

  const cards = container.querySelectorAll('[data-feedback-card]')
  const modal = document.querySelector('[data-modal="feedback"]')
  if (!cards.length || !modal) {
    return
  }

  const modalTitle = modal.querySelector('[data-modal-title]')
  const modalDescription = modal.querySelector('[data-modal-description]')

  cards.forEach((card) => {
    setupFeedbackCard(
      card,
      {
        modal,
        modalTitle,
        modalDescription,
      },
      windowCards,
    )
  })
}

function setupFeedbackCard(cardNode, modalElements, cards) {
  const cardIndex = cardNode.dataset.feedbackCard
  const cardData = cards[cardIndex]

  if (!cardData) {
    return
  }

  const {
    modal,
    modalTitle,
    modalDescription,
  } = modalElements

  if (cardData.youtube_id) {
    cardNode.classList.add('feedback-card_youtube')
  }

  cardNode.addEventListener('click', () => {
    modalTitle.innerHTML = cardData.name
    modalDescription.innerHTML = cardData.content || cardData.description

    if (cardData.youtube_id) {
      const player = document.createElement('lite-youtube')
      player.setAttribute('videoid', cardData.youtube_id)
      // player.setAttribute('js-api', 'js-api')
      modalDescription.insertAdjacentElement('afterend', player)
    }

    openModal(modal)
  })
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

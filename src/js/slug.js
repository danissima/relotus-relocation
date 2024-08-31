import { setupAccordion, openAccordion } from './accordion.js'
import setupCarousel from './carousel.js'
import { openModal, setupModal } from './modal.js'

setupDocumentsCarousel()
setupDocumentsCards()
setupForCarousel()
setupQuestionsSection()
setupTeamCarousel()
setupYoutubeCarousel()

function setupDocumentsCarousel() {
  const carousel = document.querySelector('[data-carousel="slug-documents"]')
  if (!carousel) return

  const carouselArrows = document.querySelector('[data-carousel-arrows="slug-documents"]')
  const carouselSlides = carousel.querySelectorAll('[data-carousel-slide]')
  const isCarouselActive = carouselSlides.length > 1 && window.innerWidth < 768

  if (!isCarouselActive) {
    carouselArrows.style.display = 'none'
    return
  }

  setupCarousel(
    carousel,
    {
      align: 'center',
    },
    carouselArrows,
  )
}

function setupDocumentsCards() {
  const cards = document.querySelectorAll('[data-slug-documents-card]')
  cards.forEach((card, index) => {
    const number = index + 1 < 10 ? `0${index + 1}` : index + 1
    card.dataset.slugDocumentsCard = number
    // card.style.setProperty('--index', number)
  })
}

function setupForCarousel() {
  const carousel = document.querySelector('[data-carousel="slug-for"]')
  if (!carousel) return

  const carouselArrows = document.querySelector('[data-carousel-arrows="slug-for"]')
  const carouselSlides = carousel.querySelectorAll('[data-carousel-slide]')
  const isCarouselActive = (carouselSlides.length > 3 && window.innerWidth >= 1440)
    || (carouselSlides.length > 2 && window.innerWidth < 1440)
    || (carouselSlides.length > 1 && window.innerWidth < 768)

  if (!isCarouselActive) {
    carouselArrows.style.display = 'none'
    return
  }

  setupCarousel(
    carousel,
    {
      align: 'start',
      dragFree: true,
      slidesToScroll: 2,
    },
    carouselArrows,
  )
}

function setupQuestionsSection() {
  const accordionsContainer = document.querySelector('[data-slug-questions]')
  if (!accordionsContainer) {
    return
  }

  const accordions = accordionsContainer.querySelectorAll('[data-accordion]')

  accordions.forEach((accordion) => setupAccordion(accordion, accordions))
  openAccordion(accordions[0])
}

function setupTeamCarousel() {
  const carousel = document.querySelector('[data-carousel="team"]')
  if (!carousel) return

  const carouselArrows = document.querySelector('[data-carousel-arrows="team"]')
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

function setupYoutubeCarousel() {
  const carousel = document.querySelector('[data-carousel="slug-youtube"]')
  const modal = document.querySelector('[data-modal="youtube"]')
  if (!carousel || !modal) return

  setupModal(modal)

  modal.addEventListener('modal-close', async () => {
    const player = modal.querySelector('lite-youtube')
    if (player) {
      // const ytPlayer = await player.getYTPlayer();
      // ytPlayer.stopVideo()
      player.remove()
    }
  })

  const modalTitle = modal.querySelector('[data-modal-title]')
  const cards = carousel.querySelectorAll('[data-slug-youtube-card]')
  cards.forEach((card) => setupYoutubeCard(card, { modal, modalTitle }))

  const carouselArrows = document.querySelector('[data-carousel-arrows="slug-youtube"]')
  const carouselSlides = carousel.querySelectorAll('[data-carousel-slide]')
  const isCarouselActive = (carouselSlides.length > 3 && window.innerWidth >= 1024)
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

function setupYoutubeCard(card, modalElements) {
  const { modal, modalTitle } = modalElements
  const cardTitle = card.querySelector('[data-title]')

  card.addEventListener('click', async () => {
    modalTitle.innerHTML = cardTitle.innerHTML

    const player = document.createElement('lite-youtube')
    player.setAttribute('videoid', card.dataset.slugYoutubeCard)
    player.setAttribute('js-api', 'js-api')
    modalTitle.insertAdjacentElement('afterend', player)

    openModal(modal)

    const ytPlayer = await player.getYTPlayer();
    ytPlayer.playVideo()
  })
}

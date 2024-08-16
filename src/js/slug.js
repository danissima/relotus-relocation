import { setupAccordion, openAccordion } from './accordion.js'
import setupCarousel from './carousel.js'

setupDocumentsCarousel()
setupDocumentsCards()
setupForCarousel()
setupQuestionsSection()

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
  const accordions = accordionsContainer.querySelectorAll('[data-accordion]')

  accordions.forEach((accordion) => setupAccordion(accordion, accordions))
  openAccordion(accordions[0])
}

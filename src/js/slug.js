import setupCarousel from './carousel.js'

setupDocumentsCarousel()
setupDocumentsCards()

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

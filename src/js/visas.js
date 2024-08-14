import setupCarousel from './carousel.js'

setupVisasSection()

function setupVisasSection() {
  const carousel = document.querySelector('[data-carousel="visas"]')
  if (!carousel) return

  const carouselArrows = document.querySelector('[data-carousel-arrows="visas"]')
  const carouselSlides = carousel.querySelectorAll('[data-carousel-slide]')
  const isCarouselActive = carouselSlides.length > 4

  if (!isCarouselActive) {
    carouselArrows.style.display = 'none'
    return
  }

  setupCarousel(
    carousel,
    {
      align: 'start',
      breakpoints: {
        '(max-width: 1023px)': {
          active: false,
        },
      },
    },
    carouselArrows,
  )
}

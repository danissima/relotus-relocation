import setupCarousel from './carousel.js'

setupServiceSection()

function setupServiceSection() {
  const carousel = document.querySelector('[data-carousel="service"]')
  if (!carousel) return

  const carouselArrows = document.querySelector('[data-carousel-arrows="service"]')
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
        '(max-width: 1279px)': {
          active: false,
        },
      },
    },
    carouselArrows,
  )
}

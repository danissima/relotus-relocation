import EmblaCarousel from 'embla-carousel'

setupVisasSection()

function setupVisasSection() {
  const carousel = document.querySelector('[data-carousel="visas"]')
  if (!carousel) return

  const carouselViewport = carousel.querySelector('[data-carousel-viewport]')
  const carouselArrows = document.querySelector('[data-carousel-arrows="visas"]')
  const carouselButtonPrev = carouselArrows.querySelector('[data-carousel-arrow="prev"]')
  const carouselButtonNext = carouselArrows.querySelector('[data-carousel-arrow="next"]')
  const carouselSlides = carousel.querySelectorAll('[data-carousel-slide]')
  const isCarouselActive = carouselSlides.length > 4

  if (!isCarouselActive) {
    carouselArrows.style.display = 'none'
    return
  }

  const carouselApi = EmblaCarousel(carouselViewport, {
    align: 'start',
    breakpoints: {
      '(max-width: 1023px)': {
        active: false,
      },
    },
  })

  carouselOnSelect(carouselApi)

  carouselApi.on('select', carouselOnSelect)

  carouselButtonPrev.addEventListener('click', () => carouselApi.scrollPrev())
  carouselButtonNext.addEventListener('click', () => carouselApi.scrollNext())

  function carouselOnSelect(api) {
    if (api.canScrollPrev()) {
      carouselButtonPrev.removeAttribute('disabled')
    } else {
      carouselButtonPrev.setAttribute('disabled', 'disabled')
    }

    if (api.canScrollNext()) {
      carouselButtonNext.removeAttribute('disabled')
    } else {
      carouselButtonNext.setAttribute('disabled', 'disabled')
    }
  }
}
import EmblaCarousel from 'embla-carousel'

setupHeroSection()

function setupHeroSection() {
  const carousel = document.querySelector('[data-carousel="hero"]')
  if (!carousel) return

  const carouselViewport = carousel.querySelector('[data-carousel-viewport]')
  const carouselImages = carousel.querySelectorAll('[data-carousel-image]')
  const carouselLinks = carousel.querySelectorAll('[data-carousel-slide-link]')
  const carouselLink = carousel.querySelector('[data-link]')
  const carouselDotsContainer = carousel.querySelector('[data-carousel-dots]')
  const carouselApi = EmblaCarousel(carouselViewport)
  const carouselDots = generateDots()

  carouselApi.on('init', (api) => {
    carouselOnSelect(api)
  })
  carouselApi.on('select', carouselOnSelect)

  function carouselOnSelect(api) {
    const currentSlideIndex = api.selectedScrollSnap()
    const previousSlideIndex = api.previousScrollSnap()

    /* change visible image */
    carouselImages[previousSlideIndex].classList.remove('home-hero-slider__image_active')
    carouselImages[currentSlideIndex].classList.add('home-hero-slider__image_active')

    /* change active dot */
    carouselDots[previousSlideIndex].classList.remove('home-hero-slider__dot_active')
    carouselDots[currentSlideIndex].classList.add('home-hero-slider__dot_active')

    /* change "more" link href */
    carouselLink.href = carouselLinks[currentSlideIndex].dataset.carouselSlideLink
  }

  function generateDots() {
    carouselApi.scrollSnapList().forEach((snap, index) => {
      const dotNode = document.createElement('div')
      dotNode.classList.add('home-hero-slider__dot')

      if (index === carouselApi.selectedScrollSnap()) {
        dotNode.classList.add('home-hero-slider__dot_active')
      }

      carouselDotsContainer.append(dotNode)
    })

    return carouselDotsContainer.childNodes
  }
}

import EmblaCarousel from 'embla-carousel'

export default function setupCarousel(carouselNode, options, arrowsNode = null) {
  const carouselViewport = carouselNode.querySelector('[data-carousel-viewport]')

  const carouselApi = EmblaCarousel(carouselViewport, options)

  /* setup arrows if presented */
  if (arrowsNode) {
    const carouselButtonPrev = arrowsNode.querySelector('[data-carousel-arrow="prev"]')
    const carouselButtonNext = arrowsNode.querySelector('[data-carousel-arrow="next"]')

    carouselOnSelect(carouselApi, carouselButtonPrev, carouselButtonNext)

    carouselApi.on('select', (api) => carouselOnSelect(api, carouselButtonPrev, carouselButtonNext))

    carouselButtonPrev.addEventListener('click', () => carouselApi.scrollPrev())
    carouselButtonNext.addEventListener('click', () => carouselApi.scrollNext())
  }

  return carouselApi
}

function carouselOnSelect(api, prevButton, nextButton) {
  if (api.canScrollPrev()) {
    prevButton.removeAttribute('disabled')
  } else {
    prevButton.setAttribute('disabled', 'disabled')
  }

  if (api.canScrollNext()) {
    nextButton.removeAttribute('disabled')
  } else {
    nextButton.setAttribute('disabled', 'disabled')
  }
}

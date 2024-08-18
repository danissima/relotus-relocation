import setupCarousel from './carousel.js'

setupJournalTags()

function setupJournalTags() {
  const carousel = document.querySelector('[data-carousel="journal-tags"]')
  if (!carousel) return

  setupCarousel(
    carousel,
    {
      align: 'start',
      dragFree: true,
    },
  )
}

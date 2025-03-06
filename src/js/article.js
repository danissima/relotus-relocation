import setupCarousel from './carousel.js'

setupJournalTags()
setupArticleAnchors()

function setupJournalTags() {
  const carousel = document.querySelector('[data-carousel="article-tags"]')
  if (!carousel) return

  setupCarousel(
    carousel,
    {
      align: 'start',
      dragFree: true,
    },
  )
}

function setupArticleAnchors() {
  const article = document.querySelector('[data-article]')
  const anchorsLinks = document.querySelector('[data-article-anchors]')
  const articleTitle = document.querySelector('[data-article-title]')

  if (!article || !anchorsLinks) {
    return
  }

  const headings = article.querySelectorAll('h2:not([data-exclude]), h3:not([data-exclude])')
  let currentAnchorId = ''
  const SCROLL_MARGIN_TOP = 106

  if (!headings.length) {
    const link = createLink(articleTitle.textContent, '#article-content')
    const li = document.createElement('li')

    li.append(link)
    anchorsLinks.append(li)

    return
  }

  generateAnchorsLinks()

  if (window.innerWidth < 1024) {
    return
  }

  setActiveLink(headings[0].id)
  window.addEventListener('scroll', handleWindowScroll)

  function generateAnchorsLinks() {
    let listItem = null
    let ul = null

    /* if every heading is H3 */
    /* make ordered links */
    if (Array.from(headings).every((heading) => heading.tagName === 'H3')) {
      headings.forEach((heading, index) => {
        const link = createLink(heading.textContent, `#heading-${index + 1}`)
        heading.id = `heading-${index + 1}`

        if (!listItem) {
          listItem = document.createElement('li')
        }

        listItem.append(link)
        anchorsLinks.append(listItem)
        listItem = null
      })

      return
    }

    /* if there are H2 and H3 headings */
    headings.forEach((heading, index) => {
      /* ignore first heading if it's H3 */
      if (heading.tagName === 'H3' && index === 0) {
        return
      }

      const nextHeading = headings[index + 1]

      const link = createLink(heading.textContent, `#heading-${index + 1}`)
      heading.id = `heading-${index + 1}`

      if (!listItem) {
        listItem = document.createElement('li')
      }

      /* H2 headings */
      if (heading.tagName === 'H2') {
        listItem.append(link)

        if (!nextHeading || nextHeading.tagName === 'H2') {
          anchorsLinks.append(listItem)
          listItem = null
        }

        return
      }

      /* H3 headings */
      if (heading.tagName === 'H3') {
        const listItemSecond = document.createElement('li')
        listItemSecond.append(link)

        if (!ul) {
          ul = document.createElement('ul')
        }

        ul.append(listItemSecond)

        if (!nextHeading || nextHeading.tagName === 'H2') {
          listItem.append(ul)
          anchorsLinks.append(listItem)
          listItem = null
        }
      }
    })
  }

  function handleWindowScroll() {
    headings.forEach((anchor) => {
      const top = window.scrollY
      const distance = top - anchor.offsetTop + SCROLL_MARGIN_TOP
      const anchorId = anchor.id

      if (distance >= 0 && currentAnchorId !== anchorId) {
        currentAnchorId = anchorId
        setActiveLink(currentAnchorId)
      }
    })
  }

  function setActiveLink(anchorId) {
    const links = anchorsLinks.querySelectorAll('[href]')

    links.forEach((link) => {
      if (link.hash === `#${anchorId}`) {
        link.classList.add('article__anchor_active')
      } else {
        link.classList.remove('article__anchor_active')
      }
    })
  }

  function createLink(content, href) {
    const link = document.createElement('a')
    link.classList.add('link')
    link.innerHTML = content
    link.href = href

    return link
  }
}

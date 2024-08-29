setupArticleAnchors()

function setupArticleAnchors() {
  const article = document.querySelector('[data-article]')
  const anchorsLinks = document.querySelector('[data-article-anchors]')

  if (!article || !anchorsLinks || window.innerWidth < 1024) {
    return
  }

  const headings = article.querySelectorAll('h2, h3')
  let currentAnchorId = ''
  const SCROLL_MARGIN_TOP = 106

  generateAnchorsLinks()

  setActiveLink(headings[0].id)
  window.addEventListener('scroll', handleWindowScroll)

  function generateAnchorsLinks() {
    let listItem = null
    let ul = null

    headings.forEach((heading, index) => {
      if (heading.tagName === 'H3' && index === 0) {
        return
      }

      const nextHeading = headings[index + 1]

      const link = document.createElement('a')
      link.classList.add('link')
      link.innerHTML = heading.textContent

      heading.id = `heading-${index + 1}`
      link.href = `#heading-${index + 1}`

      if (!listItem) {
        listItem = document.createElement('li')
      }

      if (heading.tagName === 'H2') {
        listItem.append(link)

        if (!nextHeading || nextHeading.tagName === 'H2') {
          anchorsLinks.append(listItem)
        }

        return
      }

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
}

setupArticleAnchors()

function setupArticleAnchors() {
  const article = document.querySelector('[data-article]')
  const anchorsLinks = document.querySelector('[data-article-anchors]')

  if (!article || !anchorsLinks || window.innerWidth < 1024) {
    return
  }

  const anchors = article.querySelectorAll('[id]')
  let currentAnchorId = ''
  const SCROLL_MARGIN_TOP = 106

  setActiveLink(anchors[0].id)
  window.addEventListener('scroll', handleWindowScroll)

  function handleWindowScroll() {
    anchors.forEach((anchor) => {
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

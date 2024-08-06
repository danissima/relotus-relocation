const header = document.querySelector('[data-header]')
if (header) {
  const burgerButton = header.querySelector('[data-burger]')
  burgerButton.addEventListener('click', () => {
    header.classList.toggle('header_full')

    if (header.classList.contains('header_full')) {
      document.body.style.setProperty('overflow', 'hidden');
    } else {
      document.body.style.removeProperty('overflow');
    }
  })
}

export default function setupSelect(select) {
  if (!select) {
    return
  }

  const trigger = select.querySelector('[data-select-trigger]')
  const triggerContent = trigger.querySelector('span')
  const dropdown = select.querySelector('[data-select-dropdown]')
  const field = select.querySelector('[data-select-field]')
  const items = dropdown.querySelectorAll('[data-value]')

  trigger.addEventListener('click', toggleIsSelectOpened)

  items.forEach((item) => {
    item.addEventListener('click', handleItemClick)
  })

  /* click outside */
  document.body.addEventListener('click', (event) => {
    if (!(select === event.target || select.contains(event.target))) {
      setIsSelectOpened(false)
    }
  })

  function handleItemClick() {
    items.forEach((item) => item.classList.remove('select__item_selected'))
    this.classList.add('select__item_selected')

    field.value = this.dataset.value
    triggerContent.innerHTML = this.dataset.value

    setIsSelectOpened(false)
  }

  function toggleIsSelectOpened() {
    select.classList.toggle('select_opened')
  }

  function setIsSelectOpened(isOpened) {
    if (isOpened) {
      select.classList.add('select_opened')
    } else {
      select.classList.remove('select_opened')
    }
  }
}

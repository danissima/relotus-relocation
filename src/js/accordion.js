export function setupAccordion(container, otherAccordions = []) {
  const trigger = container.querySelector('[data-accordion-trigger]')

  trigger.addEventListener('click', () => {
    /* if accordion is about to be opened */
    if (!container.classList.contains('accordion_opened')) {
      otherAccordions.forEach((accordion) => closeAccordion(accordion))
    }

    container.classList.toggle('accordion_opened')
  })
}

export function openAccordion(container) {
  container.classList.add('accordion_opened')
}

export function closeAccordion(container) {
  container.classList.remove('accordion_opened')
}

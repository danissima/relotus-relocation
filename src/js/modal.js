export function setupModal(modal) {
  if (!modal) {
    return
  }

  const modalOverlay = modal.querySelector('[data-modal-overlay]')
  const modalClose = modal.querySelector('[data-modal-close]')

  document.addEventListener('keyup', (event) => {
    if (event.key === 'Escape') {
      closeModal(modal)
    }
  })

  modalOverlay.addEventListener('click', () => closeModal(modal))
  modalClose.addEventListener('click', () => closeModal(modal))
}

export function openModal(modalNode) {
  modalNode.classList.add('modal_opened')
  document.body.style.setProperty('overflow', 'hidden')
}

export function closeModal(modalNode) {
  modalNode.classList.remove('modal_opened')
  document.body.style.removeProperty('overflow')
  modalNode.dispatchEvent(new Event('modal-close'))
}

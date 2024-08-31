import { openModal, setupModal } from './modal.js'

setupConsultationForm()

function setupConsultationForm() {
  const modal = document.querySelector('[data-modal="consultation"]')
  const modalButtons = document.querySelectorAll('[data-button="consultation"]')

  if (!modal || !modalButtons.length) {
    return
  }

  setupModal(modal)

  modalButtons.forEach((button) => {
    button.addEventListener('click', () => openModal(modal))
  })
}

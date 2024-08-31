import { openModal, setupModal } from './modal.js'

setupChancesForm()

function setupChancesForm() {
  const modal = document.querySelector('[data-modal="chances"]')
  const buttons = document.querySelectorAll('[data-button="chances"]')

  if (!modal || !buttons.length) {
    return
  }

  setupModal(modal)

  buttons.forEach((button) => {
    button.addEventListener('click', () => openModal(modal))
  })
}

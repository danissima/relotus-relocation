import { openModal, setupModal } from './modal.js'
import setupSelect from './select.js'

setupChancesForm()

function setupChancesForm() {
  const modal = document.querySelector('[data-modal="chances"]')
  const modalButtons = document.querySelectorAll('[data-button="chances"]')

  if (!modal || !modalButtons.length) {
    return
  }

  setupModal(modal)

  modalButtons.forEach((button) => {
    button.addEventListener('click', () => openModal(modal))
  })

  const form = document.querySelector('[data-form="chances"]')
  const selectFields = form.querySelectorAll('[data-select]')

  selectFields.forEach((field) => setupSelect(field))
}

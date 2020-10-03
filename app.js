const ui = new UI()

ui.note.form.addEventListener('submit', async e => {
  e.preventDefault()
  const { title, body, important } = ui.note.form

  await API.createNote(title.value, body.value, important.checked)
  ui.renderNotes(API.notes)
})

ui.note.noteContainer.addEventListener('click', async e => {
  console.log('notes clicked')
  if (e.target.tagName === 'BUTTON') {
    const idToDelete = e.target.parentElement.parentElement.parentElement.getAttribute(
      'data-id'
    )

    await API.deleteNote(idToDelete)
    ui.renderNotes(API.notes)
  }
})
;(async () => {
  await API.getNotes()
  console.log(API.notes)
  ui.renderNotes(API.notes)
})()

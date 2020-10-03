const ui = new UI()

ui.note.form.addEventListener('submit', async e => {
  e.preventDefault()
  const { title, body, important } = ui.note.form

  await API.createNote(title.value, body.value, important.checked)
  ui.renderNotes(API.notes)
})
;(async () => {
  await API.getNotes()
  console.log(API.notes)
  ui.renderNotes(API.notes)
})()

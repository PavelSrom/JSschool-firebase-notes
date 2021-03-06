const ui = new UI()

/**
 * onSubmit handler for new note form
 */
ui.note.form.addEventListener('submit', async e => {
  e.preventDefault()
  const { title, body, important } = ui.note.form

  await API.createNote(title.value, body.value, important.checked)
  ui.renderNotes(API.notes)
})

/**
 * onClick handler for note container to detect button presses
 * 'updateNote' separate event handler to be used later for removing the listener
 */
const updateNote = async (e, id, data) => {
  e.preventDefault()

  await API.updateNote(id, data)
}

ui.note.noteContainer.addEventListener('click', async e => {
  if (e.target.tagName === 'BUTTON') {
    const idToManipulate = e.target.parentElement.parentElement.parentElement.getAttribute(
      'data-id'
    )
    if (e.target.classList.contains('btn-success')) {
      // you clicked on 'update'
      ui.noteUpdateForm.addEventListener('submit', e => {
        const dataToUpdate = {
          title: ui.noteUpdateForm.updateTitle.value,
          body: ui.noteUpdateForm.updateBody.value,
          important: ui.noteUpdateForm.updateImportant.checked,
        }

        updateNote(e, idToManipulate, dataToUpdate)
      })
      // remove listener to prevent memory leaks
      ui.noteUpdateForm.removeEventListener('submit', updateNote)
    } else {
      // you clicked on 'delete'
      await API.deleteNote(idToManipulate)
    }

    // re-render after state change
    ui.renderNotes(API.notes)
  }
})

/**
 * onChange handler for 'important' checkbox
 */
ui.search.important.addEventListener('change', e => {
  // update state
  const onlyImportantNotes = API.notes.filter(({ important }) => important)
  // update UI
  ui.renderNotes(e.target.checked ? onlyImportantNotes : API.notes)
})

/**
 * OBS: filtering data should happen on the backend
 * onChange handler for search input
 */
ui.search.text.addEventListener('input', e => {
  const query = e.target.value

  // update state
  const filteredNotes = API.notes.filter(
    ({ title, body }) => title.startsWith(query) || body.startsWith(query)
  )
  // update UI
  ui.renderNotes(filteredNotes)
})
;(async () => {
  await API.getNotes()
  ui.renderNotes(API.notes)
})()

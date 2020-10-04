class UI {
  constructor() {
    this.note = {
      form: document.getElementById('new-note-form'),
      noteContainer: document.getElementById('note-container'),
    }
    this.search = {
      text: document.getElementById('search-input'),
      important: document.getElementById('only-important'),
    }
    this.noteUpdateForm = document.getElementById('note-update-form')
  }

  /**
   * update the UI with the current state snapshot
   * @param {Note[]} notes
   */
  renderNotes(notes) {
    let html = ''

    notes.forEach(({ id, title, body, important }) => {
      html += `
				<li data-id="${id}" class="list-group-item">
					<div class="d-flex justify-content-between align-items-center">
						<div>
							<h5>${title}</h5>
							<p>${body}</p>
							${important ? '<p class="text-danger">Important note!</p>' : ''}
						</div>
						<div class="d-flex">
							<button class="btn btn-success mr-2" data-toggle="modal" data-target="#updateModal">Update</button>
							<button class="btn btn-danger">Delete</button>
						</div>
					</div>
				</li>
			`
    })

    this.note.noteContainer.innerHTML = html
  }
}

class UI {
  constructor() {
    this.note = {
      form: document.getElementById('new-note-form'),
      noteContainer: document.getElementById('note-container'),
    }
    this.search = {
      text: document.getElementById('search-input'),
      submitBtn: document.getElementById('search-btn'),
    }
    this.noteItem = {
      deleteBtn: document.getElementById('note-delete'),
      editBtn: document.getElementById('note-edit'),
    }
  }

  /**
   * sure, there could be more methods to update the UI faster and more efficiently,
   * but I'm too lazy to do that ;) we have React
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
						</div>
						<div class="d-flex">
							<button class="btn btn-danger">Delete</button>
						</div>
					</div>
				</li>
			`
    })
    console.log(html)

    this.note.noteContainer.innerHTML = html
  }
}

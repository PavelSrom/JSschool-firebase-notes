class API {
  static error = false
  static loading = false
  static notes = []

  /**
   * fetch all notes
   */
  static getNotes = async () => {
    API.loading = true

    try {
      const res = await db.collection('notes').get()
      const data = res.docs.map(doc => ({ id: doc.id, ...doc.data() }))

      API.notes = data
    } catch (err) {
      API.error = err
    } finally {
      API.loading = false
    }
  }

  /**
   * create a new note
   * @param {string} title
   * @param {string} body
   * @param {boolean} important
   */
  static createNote = async (title, body, important) => {
    API.loading = true

    try {
      await db.collection('notes').add({
        title,
        body,
        important,
        createdAt: Date.now(),
      })

      await API.getNotes() // refetch :(
    } catch (err) {
      API.error = err
    } finally {
      API.loading = false
    }
  }

  /**
   * delete an existing note
   * @param {string} id
   */
  static deleteNote = async id => {
    API.loading = true

    try {
      await db.collection('notes').doc(id).delete()
      await API.getNotes() // refetch :(
    } catch (err) {
      API.error = err
    } finally {
      API.loading = false
    }
  }

  /**
   * update an existing note
   * @param {string} id
   * @param {Note} dataToUpdate
   */
  static updateNote = async (id, dataToUpdate) => {
    API.loading = true

    try {
      await db.collection('notes').doc(id).update(dataToUpdate)
      await API.getNotes() // refetch :(
    } catch (err) {
      API.error = err
    } finally {
      API.loading = false
    }
  }
}

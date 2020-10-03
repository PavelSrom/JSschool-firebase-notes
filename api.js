class API {
  static error = false
  static loading = false
  static notes = []
  static searchNotes = []

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

  static createNote = async (title, body, important) => {
    API.loading = true

    try {
      await db.collection('notes').add({
        title,
        body,
        important,
        createdAt: Date.now(),
      })

      /**
       * if firebase doesn't return the newly created note, just like any
       * standard API would do, that sucks and I have to make an extra request
       * to refetch the notes again => bad for performance, bad for UX
       */
      await API.getNotes()
    } catch (err) {
      API.error = err
    } finally {
      API.loading = false
    }
  }

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

  static updateNote = async (id, dataToUpdate) => {
    API.loading = true

    try {
      await db.collection('notes').doc(id).update(dataToUpdate)
      await API.getNotes() // refetch :(
      console.log('updated successfully...')
    } catch (err) {
      console.log(err)
      API.error = err
    } finally {
      API.loading = false
    }
  }
}

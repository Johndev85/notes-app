import axiosInstance from "./axios.js"

//get all notes
export const getNotesRequest = async () => {
  return axiosInstance.get("/notes")
}

//get a note
export const getNoteRequest = async (id) => {
  return axiosInstance.get(`/notes/${id}`)
}

//create a note
export const createNoteRequest = async (note) => {
  return axiosInstance.post("/notes", note)
}

//delete a note
export const deleteNoteRequest = async (id) => {
  return axiosInstance.delete(`/notes/${id}`)
}

//update a note
export const updateNoteRequest = async (note) => {
  return axiosInstance.put(`/notes/${note.id}`, note)
}

//update status of a note by id
export const updateNoteStatusRequest = async (note) => {
  return axiosInstance.put(`/notes/${note.id}/status`, note.status)
}

import axiosInstance from "./axios.js"

//get all notes
export const getNotesRequest = async () => {
  return axiosInstance.get("/notes")
}

//get a note
export const getNoteRequest = async (note) => {
  axiosInstance.get(`/notes/${note.id}`)
}

//create a note
export const createNoteRequest = async (note) => {
  axiosInstance.post("/notes", note)
}

//delete a note
export const deleteNoteRequest = async (note) => {
  axiosInstance.delete(`/notes/${note.id}`)
}

//update a note
export const updateNoteRequest = async (note) => {
  axiosInstance.put(`/notes/${note.id}`, note)
}

//update status of a note by id
export const updateNoteStatusRequest = async (note) => {
  axiosInstance.put(`/notes/${note.id}/status`, note)
}

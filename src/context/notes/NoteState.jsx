import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{

   const notesInitial = [
    {
      "_id": "66c45f8b061b5e80ce985ced",
      "user": "66c32fe3e7846a685a14620c",
      "title": "morning routine updated",
      "description": "wake up at 9",
      "tag": "personal",
      "date": "2024-08-20T09:19:07.238Z",
      "__v": 0
    },
    {
      "_id": "66c73bef820fda9d81e71d0f",
      "user": "66c32fe3e7846a685a14620c",
      "title": "evening",
      "description": "snacks at 6",
      "tag": "personal",
      "date": "2024-08-22T13:23:59.609Z",
      "__v": 0
    }
  ]

  const [notes, setNotes] = useState(notesInitial);

  const addNote = (title, description, tag) => {
    console.log("adding a new note")
    const note = {
      "_id": "66c73bef820fda9d81e71d0f1",
      "user": "66c32fe3e7846a685a14620c2",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2024-08-22T13:23:59.609Z",
      "__v": 0
    }
    setNotes(notes.concat(note))

  }

   const deleteNote = (id)=>{
    console.log("deleting a note with id" + id);
    const newNotes = notes.filter((note)=>{return note._id !== id});
    setNotes(newNotes);

   }

  // const editNote = ()=>{

  // }

    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
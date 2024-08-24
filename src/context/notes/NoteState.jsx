import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{

  const host = "http://localhost:5000"
  const notesInitial = [] 
  const [notes, setNotes] = useState(notesInitial);

  const getNotes = async () => {

    //API calling
    const response = await fetch(`${host}/api/notes/fetchallnotes` , {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });

    const json = await response.json();
    console.log(json);
    setNotes(json);

  }

  const addNote = async (title, description, tag) => {
    //API calling
    const response = await fetch(`${host}/api/notes/addnote` , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      } ,
      body: JSON.stringify({title, description, tag})
    });

    const note = await response.json();
    setNotes(notes.concat(note))

  }

   const deleteNote = async (id)=>{
    //API calling 
    const response = await fetch(`${host}/api/notes/deletenote/${id}` , {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });

    const json = await response.json();
    console.log(json);

    console.log("deleting a note with id" + id);
    const newNotes = notes.filter((note)=>{return note._id !== id});
    setNotes(newNotes);

   }

   const editNote = async (id, title, description, tag)=>{
    //API calling 
    const response = await fetch(`${host}/api/notes/updatenote/${id}` , {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      } ,
      body: JSON.stringify({title, description, tag})
    });

    const json = await response.json();
    console.log(json);

    const newNotes = JSON.parse(JSON.stringify(notes));

    //logic for the client side
    for(let index=0; index<notes.length; index++){
      const element = newNotes[index];

      if(element._id === id){
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
    }
    setNotes(newNotes);

  }

    return(
        <NoteContext.Provider value={{notes, getNotes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;
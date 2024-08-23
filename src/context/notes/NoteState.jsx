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
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjMzJmZTNlNzg0NmE2ODVhMTQ2MjBjIn0sImlhdCI6MTcyNDA2Nzg1Mn0.tF5qCmxkwyrZMSxMbrEw4hLGkA8DQu0eW10uwxqASbI'
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
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjMzJmZTNlNzg0NmE2ODVhMTQ2MjBjIn0sImlhdCI6MTcyNDA2Nzg1Mn0.tF5qCmxkwyrZMSxMbrEw4hLGkA8DQu0eW10uwxqASbI'
      } ,
      body: JSON.stringify({title, description, tag})
    });

    const json = await response.json();
    console.log(json);

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

   const deleteNote = async (id)=>{
    //API calling 
    const response = await fetch(`${host}/api/notes/deletenote/${id}` , {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjMzJmZTNlNzg0NmE2ODVhMTQ2MjBjIn0sImlhdCI6MTcyNDA2Nzg1Mn0.tF5qCmxkwyrZMSxMbrEw4hLGkA8DQu0eW10uwxqASbI'
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
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjMzJmZTNlNzg0NmE2ODVhMTQ2MjBjIn0sImlhdCI6MTcyNDA2Nzg1Mn0.tF5qCmxkwyrZMSxMbrEw4hLGkA8DQu0eW10uwxqASbI'
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
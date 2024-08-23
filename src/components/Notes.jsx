import React from 'react'
import { useContext } from 'react';
import NoteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = (props) => {

    const context = useContext(NoteContext);
    const{notes, addNote} = context;

  return (
    <>

    <AddNote/>

    <div class="container row my-3">
         <h1>Your Notes</h1>
  {
    notes.map((note) => {
      return <NoteItem key={note._id} note={note} showAlert={props.showAlert}/>

  })
} 
    </div>

    </>
      )
}

export default Notes;

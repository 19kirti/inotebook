import React from 'react'
import { useContext , useState, useEffect, useRef} from 'react';
import NoteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import {useNavigate} from 'react-router-dom'

const Notes = (props) => {

    const context = useContext(NoteContext);
    const{notes, getNotes, editNote} = context;
    let navigate = useNavigate();

    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag:"default"});

    useEffect(()=>{
      if(localStorage.getItem('token')){
        getNotes()
      }
      else{
        navigate("/login")
      }
    }, [])

    const updateNote = (currentNote)=>{
      ref.current.click();
      setNote({id: currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
      
    }

    const ref = useRef(null);
    const refClose = useRef(null);

    const handleClick = (e)=> {
      console.log("Updating the note")
      editNote(note.id, note.etitle, note.edescription, note.etag);
      refClose.current.click();
      props.showAlert("Updated the Note successfully")
  }

  const onChange = (e) => {
      setNote({...note, [e.target.name]: e.target.value});

  }

  return (
    <>

    <AddNote showAlert={props.showAlert}/>

    <div class="my-3">
     <button ref={ref} type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Open Editing Modal
      </button>
      </div>

<div class="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form>
  <div class="mb-3">
    <label htmlFor="title" class="form-label">Title</label>
    <input type="text" class="form-control" onChange={onChange} id="etitle" name="etitle" value={note.etitle} minLength={5} required aria-describedby="emailHelp"/>
    <div id="emailHelp" class="form-text">Enter your Title here</div>
  </div>
  <div class="mb-3">
    <label htmlFor="description" class="form-label">Description</label>
    <input type="text" class="form-control" onChange={onChange} id="edescription" name="edescription" value={note.edescription} minLength={5} required />
  </div>
  <div class="mb-3">
    <label htmlFor="tag" class="form-label">Tag</label>
    <input type="text" class="form-control" onChange={onChange} id="etag" name="etag" value={note.etag} minLength={5} required />
  </div>
  
  </form>
    </div>
      <div class="modal-footer">
        <button ref={refClose} type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" class="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>

    <div class="row my-3">
         <h1>Your Notes</h1>
         <div class="container">
         {notes.length===0 && "No Notes to display"}
         </div>
  {
    notes.map((note) => {
      return <NoteItem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert}/>
  })
} 
    </div>

    </>
  )
}

export default Notes;

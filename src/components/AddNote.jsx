import React, { useContext, useState } from 'react';
import NoteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    
    const context = useContext(NoteContext);
    const{addNote} = context;
    const [note, setNote] = useState({title: "", description: "", tag:"default"});

    const handleClick = (e)=> {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag:""})
        props.showAlert("Added the Note successfully")

    }

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value});

    }

  return (
    <div>
      <form>
  <div class="mb-3">
    <label htmlFor="title" class="form-label">Title</label>
    <input type="text" class="form-control" onChange={onChange} id="title" name="title" value={note.title} minLength={5} required aria-describedby="emailHelp"/>
    <div id="emailHelp" class="form-text">Enter your Title here</div>
  </div>
  <div class="mb-3">
    <label htmlFor="description" class="form-label">Description</label>
    <input type="text" class="form-control" onChange={onChange} id="description" name="description" value={note.description} minLength={5} required />
  </div>
  <div class="mb-3">
    <label htmlFor="tag" class="form-label">Tag</label>
    <input type="text" class="form-control" onChange={onChange} id="tag" name="tag" value={note.tag} minLength={5} required/>
  </div>
  

  <button disabled={note.title.length<5 || note.description.length<5} type="submit" class="btn btn-primary" onClick={handleClick} >Add Note</button>
</form>

    </div>

  )
}

export default AddNote

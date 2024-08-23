import React, { useContext, useState } from 'react';
import NoteContext from '../context/notes/noteContext';

const AddNote = () => {
    
    const context = useContext(NoteContext);
    const{addNote} = context;
    const [note, setNote] = useState({title: "", description: "", tag:"default"});

    const handleClick = (e)=> {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);

    }

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value});

    }

  return (
    <div>
      <form>
  <div class="mb-3">
    <label htmlFor="title" class="form-label">Title</label>
    <input type="text" class="form-control" onChange={onChange} id="title" name="title" aria-describedby="emailHelp"/>
    <div id="emailHelp" class="form-text">Enter your Title here</div>
  </div>
  <div class="mb-3">
    <label htmlFor="description" class="form-label">Description</label>
    <input type="text" class="form-control" onChange={onChange} id="description" name="description" />
  </div>
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>

  <button type="submit" class="btn btn-primary" onClick={handleClick} >Submit</button>
</form>

    </div>

  )
}

export default AddNote

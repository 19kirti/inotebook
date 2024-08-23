import React, {useContext} from 'react'
import NoteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    //const {note} = props;

    const context = useContext(NoteContext);
    const{deleteNote} = context;

    // const deleteItem = () => {
    //   props.showAlert("NoteItem deleted successfully")
    // }

    // const updateItem = () => {
    //   props.showAlert("NoteItem updated successfully")
    // }

  return (
    <div class="col md-3">
    <div class="card">
    <div class="card-body">
    <h5 class="card-title">{props.note.title}</h5>
    <p class="card-text">{props.note.description}</p>
    <i class="fa-solid fa-trash" onClick={()=>{deleteNote(props.note._id)}}></i>
    <i class="fa-solid fa-pen-to-square mx-3" ></i>
    </div>
    </div>
    </div>
  )
}

export default NoteItem

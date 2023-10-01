import React from "react";
import noteContext from "../context/notes/noteContext";
import { useContext } from "react";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote,  } = context;
  const { note, updateNote,} = props;

  const handleUpdateNote = () => {
    updateNote(note);
    /* showAlert("Note Updated Successfully", "success"); */
  };

  return (
    <div className="col-md-3">
      <div className="card my-3"/*  style={{bottom: "57px", position: "relative"}} */>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i className="fa-solid fa-trash mx-2" onClick={() => { deleteNote(note._id)}}></i>
          <i
            className="fa-regular fa-pen-to-square mx-2"
            onClick={ 
              handleUpdateNote 
             /*  showAlert("Note Updated Successfully", "success");  */
            }
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            data-bs-dismiss="modal"
          ></i>
        </div> 
      </div>
    </div>
  );
};

export default Noteitem;

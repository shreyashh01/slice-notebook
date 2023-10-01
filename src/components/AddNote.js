import React, { useContext, useState, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import Typed from "typed.js"

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  useEffect(() =>{
    const opt ={
      strings: ["Add a Note", "Add a Note"],
      typeSpeed: 50,
      showCursor: false,

    };
    const typed = new Typed("#element", opt);

    return () =>{
      typed.destroy();
    };

  }, [])

  const [note, setNote] = useState({title: "", description: "", tag: ""})

  const handleClick = (e) => {
    e.preventDefault();
    console.log("clicked");
    addNote(note.title, note.description,note.tag)
    setNote({title: "", description: "", tag: ""})

  };
  const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value})

  }
  return (
    <div className="add-note-container">
      <div id = "element" className="add-note-heading" style={{position: "relative", color: "white", bottom: "51px", margin:"14px", fontSize: "1.5rem"}}></div>
    <div className="container my-3">
      <form>
        <div className="mb-3"  style={{bottom: "41px", position: "relative", padding: "1px"}} >
          <label htmlFor="title" className="form-label" style={{color: "white", fontSize: "1.3rem"}}>
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            value ={note.title}
            onChange={onChange}
          />
        </div>
        <div className="mb-3" style={{bottom: "41px", position: "relative", padding: "1px"}}>
          <label htmlFor="desc" className="form-label" style={{color: "white" , fontSize: "1.3rem"}}>
         Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name = "description"
            value ={note.description}
            onChange={onChange}
          />
        </div>

        <div className="mb-3" style={{bottom: "41px", position: "relative", padding: "1px"}}>
          <label htmlFor="desc" className="form-label" style={{color: "white" , fontSize: "1.3rem"}}>
         Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name = "tag"
            value ={note.tag}
            onChange={onChange}
          />
        </div>

        <button disabled={note.title.length<2 || note.description.length<2} type="submit" style={{position: "relative", left: "3px", bottom: "44px"}} className="btn1" onClick={handleClick} >
          Add Note
        </button>
      </form>
    </div>
    </div>
  );
};

export default AddNote;

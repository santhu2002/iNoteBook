import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  // const host = "http://localhost:5000"
  const host = "https://inotebook-backend-cj72.onrender.com"
  const notesintial = []
  const [notes, setNotes] = useState(notesintial);

  // GET all Note
  const getnotes = async () => {

    //API Call(syntax gathered from internet)
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });

    const json = await response.json();
    console.log(json)
    setNotes(json)

  }


  // ADD a Note
  const addnote = async (title, description, tag) => {

    //API Call(syntax gathered from internet)
    const response = await fetch(`${host}/api/notes/addingnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    setNotes(notes.concat(note))
  }


  // DELETE  a Note
  const deletenote = async (id) => {
    //API Call(syntax gathered from internet)
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log(json);

    //logic to delete note
    const newnotes = notes.filter((note) => { return note._id !== id });
    setNotes(newnotes);

  }
  // EDIT a Note
  const editnote = async (id, title, description, tag) => {

    //API Call(syntax gathered from internet)
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json)

    let newnotes = JSON.parse(JSON.stringify(notes))
    //Logic to edit in client site
    for (let index = 0; index <newnotes.length; index++) {
      const element = newnotes[index];
      if (element._id === id) {
        newnotes[index].title = title;
        newnotes[index].description = description;
        newnotes[index].tag = tag;
        break;
      }
    }
    setNotes(newnotes)

  }

  return (
    <NoteContext.Provider value={{ notes, addnote, editnote, deletenote, getnotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesintial = []
  const [notes, setNotes] = useState(notesintial);

  // GET all Note
  const getnotes = async () => {

    //API Call(syntax gathered from internet)
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjOWVjY2Q3OWI1ZGYxZjVmOWE1ODBkIn0sImlhdCI6MTY0MDc5ODY1OH0.H-t3PDhMChpo9fRqsn-OFRpDDGKbp4FdGzdb3glMgrs'
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
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjOWVjY2Q3OWI1ZGYxZjVmOWE1ODBkIn0sImlhdCI6MTY0MDc5ODY1OH0.H-t3PDhMChpo9fRqsn-OFRpDDGKbp4FdGzdb3glMgrs'
      },
      body: JSON.stringify({ title, description, tag })
    });


    const note = {
      "_id": "61d1acde22978d56a3ac206ccnn",
      "user": "61c9eccd79b5df1f5f9a580nnd",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2022-01-02T13:47:10.033Z",
      "__v": 0
    }
    setNotes(notes.concat(note))
  }


  // DELETE  a Note
  const deletenote = async (id) => {
    //API Call(syntax gathered from internet)
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjOWVjY2Q3OWI1ZGYxZjVmOWE1ODBkIn0sImlhdCI6MTY0MDc5ODY1OH0.H-t3PDhMChpo9fRqsn-OFRpDDGKbp4FdGzdb3glMgrs'
      },
    });
    const json = response.json();
    console.log(json);

    //logic to delete note
    const newnotes = notes.filter((note) => { return note._id !== id });
    setNotes(newnotes);

  }
  // EDIT a Note
  const editnote = async (id, title, description, tag) => {

    //API Call(syntax gathered from internet)
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjOWVjY2Q3OWI1ZGYxZjVmOWE1ODBkIn0sImlhdCI6MTY0MDc5ODY1OH0.H-t3PDhMChpo9fRqsn-OFRpDDGKbp4FdGzdb3glMgrs'
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();


    //Logic to edit in client site
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }

    }

  }

  return (
    <NoteContext.Provider value={{ notes, addnote, editnote, deletenote, getnotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
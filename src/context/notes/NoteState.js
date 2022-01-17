import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState =(props)=>{
    const notesintial =[
        {
          "_id": "61ccb71b93a3462a317ee256",
          "user": "61c9eccd79b5df1f5f9a580d",
          "title": "first note",
          "description": "this is first note",
          "tag": "General",
          "date": "2021-12-29T19:29:31.620Z",
          "__v": 0
        },
        {
          "_id": "61d1acde2298d96a3ac206cc",
          "user": "61c9eccd79b5df1f5f9a580d",
          "title": "first note",
          "description": "this is first note",
          "tag": "General",
          "date": "2022-01-02T13:47:10.033Z",
          "__v": 0
        },
        {
            "_id": "61ccb71b93a73462a317ee2567",
            "user": "61c9eccd79b5df1f5f9a580d",
            "title": "first note",
            "description": "this is first note",
            "tag": "General",
            "date": "2021-12-29T19:29:31.620Z",
            "__v": 0
          },
          {
            "_id": "61d1acde22978d56a3ac206cc7",
            "user": "61c9eccd79b5df1f5f9a580d",
            "title": "first note",
            "description": "this is first note",
            "tag": "General",
            "date": "2022-01-02T13:47:10.033Z",
            "__v": 0
          },
         {
            "_id": "61ccb71b93a37462a317ee256",
            "user": "61c9eccd79b5df1f5f9a580d",
            "title": "first note",
            "description": "this is first note",
            "tag": "General",
            "date": "2021-12-29T19:29:31.620Z",
            "__v": 0
          },
          {
            "_id": "61d1acde22978d56a3ac206cc",
            "user": "61c9eccd79b5df1f5f9a580d",
            "title": "first note",
            "description": "this is first note",
            "tag": "General",
            "date": "2022-01-02T13:47:10.033Z",
            "__v": 0
          }
      ]
      const [notes, setNotes] = useState(notesintial);


      // ADD a Note
      const addnote =(title,description,tag)=>{
      const note={
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
      const deletenote=(id)=>{
        const newnotes =notes.filter((note)=>{return note._id!==id});
        setNotes(newnotes);

      }
      // EDIT a Note
      const editnote=(id)=>{

      }
 
    return(
        <NoteContext.Provider value={{notes,addnote,editnote,deletenote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
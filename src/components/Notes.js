import React,{useContext} from 'react';
import noteContext from '../context/notes/noteContext';
import Addnote from './Addnote';
import Noteitem from './Noteitem';

export default function Notes() {
    const context = useContext(noteContext);
    const {notes,addnote}= context;
    return (
        <>
        <Addnote/>
        <div className="row">
            <h1>Your Notes</h1>
            {notes.map((note) => {
                return <Noteitem key={note._id} note={note}/>
            })}
        </div>
        </>
    )
}

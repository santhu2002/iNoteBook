import React,{useContext} from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';

export default function Notes() {
    const context = useContext(noteContext);
    const {notes}= context;
    return (
        <div className="row">
            <h1>Your Notes</h1>
            {notes.map((note) => {
                return <Noteitem key={note._id} note={note}/>
            })}
        </div>
    )
}

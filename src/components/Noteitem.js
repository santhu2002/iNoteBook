import React,{useContext} from 'react';
import noteContext from '../context/notes/noteContext';

export default function Noteitem(props) {
    const { note,updatenote } = props;

    const context = useContext(noteContext);
    const {deletenote}= context;

    return (
        <div className='col-md-3'>
            <div className="card my-3"  >
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">   {note.description}</p>
                        <i className="fas fa-trash-alt mx-2" onClick={()=>{deletenote(note._id);props.showalert("Deleted Note Successfully","success")}}></i>
                        <i className="fas fa-edit mx-2"onClick={()=>{updatenote(note)}}></i>
                    </div>
            </div>
        </div>
    )
}

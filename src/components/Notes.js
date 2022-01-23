import React, { useContext, useEffect, useRef,useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Addnote from './Addnote';
import Noteitem from './Noteitem';

export default function Notes(props) {
    const context = useContext(noteContext);
    const { notes, getnotes, editnote } = context;
    useEffect(() => {
        getnotes();
        // eslint-disable-next-line
    }, [])
    const [note, setnote] = useState({id:"",etitle:"",edescription:"",etag:""})

    const handleclick =(e)=>{
        editnote(note.id,note.etitle,note.edescription,note.etag)
        refclose.current.click();
        props.showalert("Updated Note Successfully","success")

    }
    const onChange=(e)=>{
        setnote({...note,[e.target.name]: e.target.value})

    }
    const updatenote = (cnote) => {
        ref.current.click();
        setnote({id:cnote._id,etitle:cnote.title , edescription:cnote.description , etag:cnote.tag})

    }
    const ref = useRef(null);
    const refclose = useRef(null);
    return (
        <>
            <Addnote showalert={props.showalert} />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                lanuch modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} value={note.etitle} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" onChange={onChange} value={note.edescription} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={note.etag} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5} className="btn btn-primary" onClick={handleclick}>Update note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <h1>Your Notes</h1>
                <div className="container mx-2">
                    {notes.length===0 && 'No Notes to display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updatenote={updatenote} note={note} showalert={props.showalert} />
                })}
            </div>
        </>
    )
}

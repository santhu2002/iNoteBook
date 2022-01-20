import React, { useContext, useEffect, useRef,useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Addnote from './Addnote';
import Noteitem from './Noteitem';

export default function Notes() {
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
            <Addnote />
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
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} value={note.etitle} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" onChange={onChange} value={note.edescription} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={note.etag} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleclick}>Update note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <h1>Your Notes</h1>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updatenote={updatenote} note={note} />
                })}
            </div>
        </>
    )
}

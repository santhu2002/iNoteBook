import React,{useContext,useState} from 'react';
import noteContext from '../context/notes/noteContext';

const Addnote = () => {
    const context = useContext(noteContext);
    const {notes,addnote}= context;

    const [note, setnote] = useState({title:"",description:"",tag:"default"})

    const handleclick =(e)=>{

        //not to reload the page
        e.preventDefault();
        
        addnote(note.title,note.description,note.tag)

    }
    const onChange=(e)=>{
        setnote({...note,[e.target.name]: e.target.value})

    }
    return (
            <div className="container my-3">
                <h1>Add a Note</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">TITLE</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">DESCRIPTION</label>
                        <input type="text" className="form-control" id="description" name="description" onChange={onChange} />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleclick}>Submit</button>
                </form>
            </div>
    )
}

export default Addnote


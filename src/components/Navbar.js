import React from 'react'
import { useHistory } from 'react-router-dom';
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
    let location = useLocation();
    let history = useHistory();

    const handlelogout =()=>{
        localStorage.removeItem('token');
        history.push('/login')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNoteBook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} aria-current="page" to="/about">About</Link>
                        </li>
                    </ul>
                    <div>
                        {!localStorage.getItem('token')?<form className="d-flex">
                        <Link role="button" to="/login" className="btn btn-primary mx-1">Login</Link>
                        <Link role="button" to="/signup"className="btn btn-primary mx-1">Sign up</Link>
                        </form>:<button onClick={handlelogout} className="btn btn-primary mx-1">Logout</button> }
                    </div>
                </div>
                {/* {!localStorage.getItem('token')?<form className="d-flex">
                    <Link role="button" to="/login" className="btn btn-primary mx-1">Login</Link>
                    <Link role="button" to="/signup"className="btn btn-primary mx-1">Sign up</Link>
                </form>:<button onClick={handlelogout} className="btn btn-primary mx-1">Logout</button> } */}
            </div>
        </nav>
    )
}

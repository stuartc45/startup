import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Home } from './home/home';
import { About } from './about/about';

export default function App() {
    return (
    <BrowserRouter>
        <div className="d-flex flex-column min-vh-100">
            <header>
                <nav className="navbar navbar-expand-lg nav-style">
                    <div className="container-fluid">
                        <h1 className="navbar-brand site-title">JournalEasy</h1>
                        <div className="nav-separator">
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                <div className="navbar-nav">
                                    <NavLink className="nav-link" to='home'>Home</NavLink>
                                    <NavLink className="nav-link" to=''>Login</NavLink>
                                    <NavLink className="nav-link" to='about'>About/How to Use</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            <Routes>
                <Route path='/' element={<Login />} exact />
                <Route path='/home' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='*' element={<NotFound />} />
            </Routes>

            <footer className="mt-auto">
                <div className="container-fluid">
                    <span className="text-reset footer-name">Stuart Card</span>
                    <a className="text-reset footer-github" href="https://github.com/stuartc45/startup">My Github</a>
                </div>
            </footer>
        </div>
    </BrowserRouter>);
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}
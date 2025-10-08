import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
    return <div className="d-flex flex-column min-vh-100">
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
                                <a className="nav-link" aria-current="page" href="home.html">Home</a>
                                <a className="nav-link" href="index.html">Login</a>
                                <a className="nav-link" href="about.html">About/How to Use</a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>

        <main></main>

        <footer className="mt-auto">
            <div className="container-fluid">
                <span className="text-reset footer-name">Stuart Card</span>
                <a className="text-reset footer-github" href="https://github.com/stuartc45/startup">My Github</a>
            </div>
        </footer>
    </div>
}
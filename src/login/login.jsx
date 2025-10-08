import React from 'react';

export function Login() {
  return (
    <main className="flex-fill">
        <div className="image">
            <img id="journal-photo" width="400" src="journal-scaled.jpeg" />
        </div>
        <h3 className="instructions">Fill out the form with your email and password to login or select Sign Up to get started!</h3>

      <div className="container mt-5">
        <ul className="nav nav-tabs justify-content-center" id="authTab" role="tablist">
            <li className="nav-item" role="presentation">
            <button className="nav-link active" id="signin-tab" data-bs-toggle="tab" data-bs-target="#signin" type="button" role="tab">
                Sign In
            </button>
            </li>
            <li className="nav-item" role="presentation">
            <button className="nav-link" id="signup-tab" data-bs-toggle="tab" data-bs-target="#signup" type="button" role="tab">
                Sign Up
            </button>
            </li>
        </ul>

        <div className="tab-content mt-3">
            <div className="tab-pane fade show active" id="signin" role="tabpanel">
                <form method="get" action="home.html">
                    <div className="mb-3">
                        <label>Email</label>
                        <input type="email" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input type="password" className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 button-color">Login</button>
                </form>
            </div>
            <div className="tab-pane fade" id="signup" role="tabpanel">
                <form method="get" action="home.html">
                    <div className="mb-3">
                        <label>Email</label>
                        <input type="email" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input type="password" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label>Confirm Password</label>
                        <input type="password" className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-success w-100">Sign Up</button>
                </form>
            </div>
        </div>
</div>


    </main>
  );
}
import React, { useState } from 'react';
import './login.css';
import { AuthState } from './authState';


export function Login() {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [activeTab, setActiveTab] = useState('signin');

  function handleLogin(e) {
    e.preventDefault();
    console.log('Logging in:', email);

    // simulate authentication
    localStorage.setItem('userName', email);
    onAuthChange(email, AuthState.Authenticated);
  }

  function handleSignup(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    console.log('Signing up:', email);
    localStorage.setItem('userName', email);
    onAuthChange(email, AuthState.Authenticated);
  }

  return (
    <main className="flex-fill container text-center mt-5">
      <div className="image mb-3">
        <img id="journal-photo" width="400" src="journal-scaled.jpeg" alt="Journal" />
      </div>

      <h3 className="instructions mb-4">
        Fill out the form with your email and password to login or select Sign Up to get started!
      </h3>

      <div className="nav nav-tabs justify-content-center mb-3">
        <button
          className={`nav-link ${activeTab === 'signin' ? 'active' : ''}`}
          onClick={() => setActiveTab('signin')}
        >
          Sign In
        </button>
        <button
          className={`nav-link ${activeTab === 'signup' ? 'active' : ''}`}
          onClick={() => setActiveTab('signup')}
        >
          Sign Up
        </button>
      </div>

      <div className="tab-content mt-3">
        {activeTab === 'signin' && (
          <div className="tab-pane fade show active">
            <form onSubmit={handleLogin} className="mx-auto" style={{ maxWidth: '400px' }}>
              <div className="mb-3 text-start">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 text-start">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
          </div>
        )}

        {activeTab === 'signup' && (
          <div className="tab-pane fade show active">
            <form onSubmit={handleSignup} className="mx-auto" style={{ maxWidth: '400px' }}>
              <div className="mb-3 text-start">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 text-start">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 text-start">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success w-100">
                Sign Up
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}


//     <main className="flex-fill">
//         <div className="image">
//             <img id="journal-photo" width="400" src="journal-scaled.jpeg" />
//         </div>
//         <h3 className="instructions">Fill out the form with your email and password to login or select Sign Up to get started!</h3>

//       <div className="container mt-5">
//         <ul className="nav nav-tabs justify-content-center" id="authTab" role="tablist">
//             <li className="nav-item" role="presentation">
//             <button className="nav-link active" id="signin-tab" data-bs-toggle="tab" data-bs-target="#signin" type="button" role="tab">
//                 Sign In
//             </button>
//             </li>
//             <li className="nav-item" role="presentation">
//             <button className="nav-link" id="signup-tab" data-bs-toggle="tab" data-bs-target="#signup" type="button" role="tab">
//                 Sign Up
//             </button>
//             </li>
//         </ul>

//         <div className="tab-content mt-3">
//             <div className="tab-pane fade show active" id="signin" role="tabpanel">
//                 <form method="get" action="home.html">
//                     <div className="mb-3">
//                         <label>Email</label>
//                         <input type="email" className="form-control" />
//                     </div>
//                     <div className="mb-3">
//                         <label>Password</label>
//                         <input type="password" className="form-control" />
//                     </div>
//                     <button type="submit" className="btn btn-primary w-100 button-color">Login</button>
//                 </form>
//             </div>
//             <div className="tab-pane fade" id="signup" role="tabpanel">
//                 <form method="get" action="home.html">
//                     <div className="mb-3">
//                         <label>Email</label>
//                         <input type="email" className="form-control" />
//                     </div>
//                     <div className="mb-3">
//                         <label>Password</label>
//                         <input type="password" className="form-control" />
//                     </div>
//                     <div className="mb-3">
//                         <label>Confirm Password</label>
//                         <input type="password" className="form-control" />
//                     </div>
//                     <button type="submit" className="btn btn-success w-100">Sign Up</button>
//                 </form>
//             </div>
//         </div>
// </div>


//     </main>

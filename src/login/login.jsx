import React, { useState } from 'react';
import './login.css';
import { AuthState } from './authState';
import { useNavigate } from 'react-router-dom';
import { Authenticated } from './authenticated';


export function Login({ userName, authState, onAuthChange }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [activeTab, setActiveTab] = useState('signin');
    const navigate = useNavigate();


    async function handleLogin(e) {
      e.preventDefault();
      console.log('Logging in:', email);
      loginOrCreate('/api/auth/login');
    }


    function handleSignup(e) {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        console.log('Signing up:', email);
        loginOrCreate('/api/auth/register');
    }


    async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200) {
      localStorage.setItem('userName', email);
      onAuthChange(email, AuthState.Authenticated);
      navigate('/home');
    } else {
      const body = await response.json();
      alert(body.msg || "Login failed");
    }
  }


  return (
    <main className="flex-fill container text-center mt-5">
        {authState === AuthState.Authenticated ? (
        <Authenticated
        userName={userName}
        onLogout={() => {
            localStorage.removeItem('userName');
            onAuthChange('', AuthState.Unauthenticated);
        }}
        />
        ) : (
            <>
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
      </>
      )}
    </main>
  );
}
import React, { useEffect, useState } from 'react';
import './about.css';
import { HolidayOfTheDay } from './holiday';

export function About() {
    return (
        <main className="flex-fill">
            <div className="how-box">
                <h2>How to Use JournalEasy</h2>
                <p className="how-info">
                    Everything you need is on the home page. After logging in, that is where you can see the journal entries that you've made, and where you can make new ones.
                    There is a button on the home page to create a new journal entry, and when you are creating a new entry you have the option to either type your entry or do voice to text.
                </p>
            </div>
            <div className="about-box">
                <h2>About JournalEasy</h2>
                <p className="about-info">
                    I started JournalEasy because I am someone that wants to journal more often than I do. I have all the intentions of journaling, right up until its late and I am
                    too tired to take the time to write. I have thought many times that I wish I could type my journal, or even talk to my phone and have it write out as a journal entry. 
                    That way I could also journal on vacations or when I travel without having to take my physical journal, but still be able to document my experiences. 
                    If you are the same way, or just looking for a nice easy way to journal, then JournalEasy is for you!
                </p>
            </div>
            <div className='holiday'>
                <HolidayOfTheDay countryCode='US' />
            </div>
        </main>
    );
}
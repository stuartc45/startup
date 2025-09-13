# JournalEasy

[My Notes](notes.md)

A brief description of the application here. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.


> [!NOTE]
>  This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

> [!NOTE]
>  If you are not familiar with Markdown then you should review the [documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) before continuing.

## 🚀 Specification Deliverable

> [!NOTE]
>  Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Sometimes when big things happen to you, you want to write them down or document them so that you can remember. Or maybe its the small moments that you often forget that seem important to preserve. Either way, journaling by hand can be a little strenuous and when it's late and you're tired it is frequently the first thing to go. But with JournalEasy it is not only quicker to type out your journal entry but since it's digital it is easier to access anywhere and record a quick memory, as well as your memories are backed up and saved no matter what. You can also just talk and have accurate voice to text do the hard work for you. It's a win win! 

### Design

The layout is very simple. Each entry will be minimized to a bar with the name and date showing. There's an option to sort, logout, and create a new entry. Once the "create new" button has been pressed, then an empty template will appear. This template has the option for voice to text or to just type.


![Design image](IMG_6578.jpg)

![Design image](IMG_6577.jpg)




```mermaid
sequenceDiagram
    participant Alice as User: Alice
    participant FE as JournalEasy Web App
    participant BE as JournalEasy Server
    participant API as Voice-to-Text API

    Alice->>FE: Login with credentials
    FE->>BE: Authenticate user
    BE-->>FE: Auth success (JWT/session)

    Alice->>FE: Start new voice journal entry
    FE->>BE: Open WebSocket connection
    BE-->>FE: WebSocket connected

    Alice->>FE: Speak into mic
    FE->>BE: Stream audio via WebSocket
    BE->>API: Forward audio to speech-to-text
    API-->>BE: Return partial transcript
    BE-->>FE: Send live transcript via WebSocket
    FE-->>Alice: Show live text while speaking

    Alice->>FE: Save journal entry with keyword/date
    FE->>BE: Send entry data
    BE-->>FE: Confirm save
```
### Key features

- Easy login provides access to all journal entries that are backed up on the cloud for protection.
- Online journaling gives options to journal no matter where you are and what device you are on.
- Voice to text permits users to journal while doing other small tasks.

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Build the content of the site. One page to login and another to display the journal entries/fill out another entry. The text of the journal entries will all be HTML.
- **CSS** - Help the site look organized with all the journal entries, interesting but not distracting colors for table headers, buttons, etc.
- **React** - Does the actual login, does the backend call when a new journal entry is created, pulls an existing journal entry from the database, helps sort the entries by date, etc.
- **Service** - Has the functionality for the login, creating an account, and logging out. Retrieves journal entries on login, and submits a new created entry. Also will support a voice to text API (I haven't decided what service I want to go with yet).
- **DB/Login** - Stores login information as well as journal entries connected to the user that created them.
- **WebSocket** - The Websocket will make the voice to text live, so that words appear as the person speaks them and they can catch any mistakes or edits they want to make as well as making the experience smoother. I could also send a notification when a different device creates or edits an entry and help multiple devices stay synced.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://journaleasy.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **HTML pages** - I did not complete this part of the deliverable.
- [ ] **Proper HTML element usage** - I did not complete this part of the deliverable.
- [ ] **Links** - I did not complete this part of the deliverable.
- [ ] **Text** - I did not complete this part of the deliverable.
- [ ] **3rd party API placeholder** - I did not complete this part of the deliverable.
- [ ] **Images** - I did not complete this part of the deliverable.
- [ ] **Login placeholder** - I did not complete this part of the deliverable.
- [ ] **DB data placeholder** - I did not complete this part of the deliverable.
- [ ] **WebSocket placeholder** - I did not complete this part of the deliverable.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Header, footer, and main content body** - I did not complete this part of the deliverable.
- [ ] **Navigation elements** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing** - I did not complete this part of the deliverable.
- [ ] **Application elements** - I did not complete this part of the deliverable.
- [ ] **Application text content** - I did not complete this part of the deliverable.
- [ ] **Application images** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - I did not complete this part of the deliverable.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.
- [ ] **Supports registration, login, logout, and restricted endpoint** - I did not complete this part of the deliverable.


## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.

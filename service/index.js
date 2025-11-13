const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

// let users = [];
// let entries = [];

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Registers a user
apiRouter.post('/auth/register', async (req, res) => {
    if (await findUser('email', req.body.email)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = await createUser(req.body.email, req.body.password);

        setAuthCookie(res, user.token);
        res.send({ email: user.email });
    }
});

// logs in a user
apiRouter.post('/auth/login', async (req, res) => {
    const user = await findUser('email', req.body.email);
      if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
          user.token = uuid.v4();
          await DB.updateUser(user);
          setAuthCookie(res, user.token);
          res.send({ email: user.email });
          return;
        }
      }
      res.status(401).send({ msg: 'Unauthorized' });
});


// logs out a user
apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        delete user.token;
        DB.updateUser(user);
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
});


const verifyAuth = async (req, res, next) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
};


// Adds a journal entry
apiRouter.post('/entry', verifyAuth, async (req, res) => {
    const entry = createEntry(req.body);
    res.status(201).send(entry);
});


// Gets the journal entries for that user
apiRouter.get('/entries', verifyAuth, async (req, res) => {
    try {
    const entries = await DB.getEntries();
    res.send(entries);
  } catch (err) {
    console.error('Error fetching entries:', err);
    res.status(500).send({ error: 'Failed to fetch entries' });
  }
});


// Deletes a journal entry
apiRouter.delete('/entry/:id', verifyAuth, (req, res) => {
    const success = deleteEntry(req.params.id);
    if (!success) {
        return res.status(404).send({ msg: 'Entry not found' });
    }
    res.status(200).send(entries);
});


// Edits a journal entry
apiRouter.put('/entry', verifyAuth, (req, res) => {
    const newEntry = updateEntry(req.body);
    if (!newEntry) {
        return res.status(404).send({ msg: 'Entry not found' });
    }
    res.status(200).send(newEntry);
});


function createEntry(entry) {
    const newEntry = {
        id: uuid.v4(),
        title: entry.title,
        date: entry.date,
        body: entry.body,
    };
    DB.addEntry(newEntry);
    // entries.push(newEntry);
    return newEntry;
}


function updateEntry(entry) {
    const id = entry.id;
    const newEntry = { "id": id, "title": entry.title, "date": entry.date, "body": entry.body};
    const index = entries.findIndex(e => e.id === id);
    if (index === -1) {
        return false;
    }
    entries.splice(index, 1, newEntry);
    return newEntry;
}


function deleteEntry(id) {

    const index = entries.findIndex(e => e.id === id);
    if (index === -1) {
        return false;
    }

    entries.splice(index, 1);
    return true;
}


async function createUser(email, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        email: email,
        password: passwordHash,
        token: uuid.v4(),
    };
    await DB.addUser(user);
    // users.push(user);

    return user;
}


async function findUser(field, value) {
    if (!value) return null;

    if (field === 'token') {
        return DB.getUserByToken(value);
      }
    return DB.getUser(value);

    // return users.find((u) => u[field] === value);
}


function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
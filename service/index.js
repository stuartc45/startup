const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

let users = [];
let entries = [];

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
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
});


// Adds a journal entry
apiRouter.post('/entry', verifyAuth, async (req, res) => {
    updateEntries(req.body);
    res.status(200).send(req.body);
});


// Deletes a journal entry
apiRouter.delete('/entry', verifyAuth, async (req, res) => {
    deleteEntry(req.body);
    res.status(204).send(entries);
});


// Edits a journal entry
apiRouter.put(`/entry`, verifyAuth, async (req, res) => {
    updateEntries(req.body);
    res.send(entries);
});


const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

function updateEntries(entry) {
    for (e in entries) {
        if (entry.title === e.title) {
            e.title = entry.title;
            e.date = entry.date;
            e.body = entry.body;
            return;
        }
    }

    entries.push(entry);

}

function deleteEntry(entry) {
    for (let i = 0; i < entries.length; i++) {
        if (entry.title === entries[i].title) {
            entries.splice(i, 1);
        }
    }
}

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  users.push(user);

  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  return users.find((u) => u[field] === value);
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
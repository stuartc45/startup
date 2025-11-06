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

});

// logs in a user
apiRouter.post('/auth/login', async (req, res) => {

});

// logs out a user
apiRouter.delete('/auth/logout', async (req, res) => {

});

// Adds a journal entry
apiRouter.post('/entry', async (req, res) => {

});
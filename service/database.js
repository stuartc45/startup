const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const entryCollection = db.collection('entry');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

function getUser(email) {
    return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
    return userCollection.findOne({ token: token });
}

async function addUser(user) {
    await userCollection.insertOne(user);
}

async function updateUser(user) {
    await userCollection.updateOne({ email: user.email }, { $set: user });
}

async function addEntry(entry) {
    await entryCollection.insertOne(entry);
}

async function getEntries() {
    try {
        const entries = await entryCollection.find({}).toArray();
        return entries;
    } catch (err) {
        console.error('Error getting entries:', err);
        throw err;
    }
}

async function deleteEntry(id) {
    try {
        const result = await entryCollection.deleteOne({ id: id });
        return result.deletedCount === 1;
    } catch (err) {
        console.error('Error deleting entry:', err);
        return false;
    }
}

async function updateEntry(entry) {
    try {
        const updateResult = await entryCollection.updateOne(
        { id: entry.id },
        {
            $set: {
            title: entry.title,
            date: entry.date,
            body: entry.body,
            },
        },
        );

        const updatedEntry = await entryCollection.findOne({ id: entry.id });
        return updatedEntry;
    } catch (err) {
        console.error('Error updating entry:', err);
        return null;
    }
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  addEntry,
  getEntries,
  deleteEntry,
  updateEntry,
};
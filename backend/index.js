const express = require('express');
const { MongoClient } = require("mongodb");
const { currentDate } = require('./formated-date');

const app = express();
const cors = require('cors');

app.use(express.json())
app.use(cors());

const url = "mongodb+srv://ranbirr314:gszC63K4Ytrl1Ogn@cluster0.na64i4d.mongodb.net/?retryWrites=true&w=majority";
const mdbclient = new MongoClient(url);

async function login() {
    try {
        const result = await mdbclient.connect();
        const db = result.db('admin_panel');
        return db.collection('admin_details');
    }
    catch (err) {
        console.log(err);
    }
};

async function userData() {
    try {
        const result = await mdbclient.connect();
        const db = result.db('customers');
        return db.collection('userdata');
    }
    catch (err) {
        console.log(err);
    }
};

async function chats() {
    try {
        const result = await mdbclient.connect();
        const db = result.db('priceandtagapp');
        return db.collection('chats');
    }
    catch (err) {
        console.log(err);
    }
};

const getChats = async (storeName) => {
    try {

        const db = await chats();
        const response = await db.find({ "name": storeName }).toArray();
        return response[0].chats;
    }
    catch (err) {
        console.log(err);
    }
};

const setChats = async (data) => {
    try {
        const db = await chats();
        await db.updateOne({ "name": data.storeName }, { $push: { "chats": { "message": data.message, "time": currentDate(data.timezone), "sender": 'Admin' } } });
    }
    catch (err) {
        console.log(err);
    }
};

app.post('/mapi/longin', async (req, res) => {
    try {
        const db = await login();
        const response = await db.find({ "email": req.body.email, "password": req.body.password }).toArray();
        if (response.length != 0) {
            res.send("1");
        }
        else {
            res.send("0");
        }
    }
    catch (err) {
        console.log(err);
    }
});

app.get('/mapi/getuserdata', async (req, res) => {
    console.log("UserData");
    try {
        const db = await userData();
        const response = await db.find().toArray();
        res.send(response);
    }
    catch (err) {
        console.log(err);
    }
});

app.post("/mapi/getChats", async (req, res) => {
    console.log("getChats");
    try {
        const response = await getChats(req.body.storeName);

        res.json(response);
    }
    catch (err) {
        console.log("Getting chat error", err);
    }
});

app.post("/mapi/setChats", async (req, res) => {
    console.log("setChats");
    try {
        const response = await setChats(req.body);
        res.send({ "response": "Success" });
    }
    catch (err) {
        console.log("Setting chat error", err);
    }
});

app.listen(5000, () => {
    console.log("listing on port 5000");
});
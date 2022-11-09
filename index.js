const express = require("express");
const cors = require("cors");
const { FireStoreDB } = require("./firebase-config.js");

const leadsCollection = new FireStoreDB('Leads')
const app = express();

app.use(cors({ origin: "*" }))
app.use(express.json())
app.listen(5050);

app.get('/leads', (request, response) => {
    timeStamp();
    leadsCollection.getCollection()
        .then((leads) => {
            console.log(leads);
            response.send(leads);
        })
})

app.post('/add-new-lead', (request, response) => {
    timeStamp();
    console.log(request.body);
    leadsCollection.addNewDocument(request.body);
    response.status(200).end();
})

function timeStamp() {
    let date = new Date();
    let [month, day, year] = [date.getMonth() + 1, date.getDate(), date.getFullYear()];
    let [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];
    console.log(`${hour}:${minutes}:${seconds} - ${month}/${day}/${year}`);
}
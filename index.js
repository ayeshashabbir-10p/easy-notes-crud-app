//import express and bodyparser
const express = require('express');
const bodyParser = require('body-parser');

//create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

// parse requests of content-type - application/json
app.use(bodyParser.json());

//configuring database
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser : true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log("Error occured : " , err);
    process.exit();
})

//define a simple route
app.get('/' , (req ,res) => {
    res.json("Hey! its working")
});

// Require Notes routes
require('./app/routes/note.routes.js')(app);

app.listen(3000, ()=>{
    console.log("Server is listening on port 3000");
});

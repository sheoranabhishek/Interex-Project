const express = require("express");
const app = express();
const expressLayout = require("express-ejs-layouts");
const path = require("path");
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');


//databse connection
const url = "mongodb+srv://abhi:interviewbit@cluster0.ojaiq.mongodb.net/interviewbit?retryWrites=true&w=majority"
mongoose.connect(url , {useNewUrlParser: true , useCreateIndex: true , useUnifiedTopology: true , useFindAndModify: true});
const connection = mongoose.connection;
connection.once('open' , ()=>{
  console.log('Database Connected');
}).catch(err=>{
  console.log('Connection Failed');
})

//Assets
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//Set Template Engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");



//Routes
require('./routes/web')(app);

//Listening to port
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

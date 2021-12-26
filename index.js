const express = require("express");
const fs = require("fs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

if (!fs.existsSync("TimeFiles")) fs.mkdirSync("TimeFiles");


//creating file
app.get("/createFile", (req, res) => {
    let date = new Date();
    let fileName = `${date.toISOString()}.txt`;
    fileName = fileName.slice(0, 19).replace(/:/g, "-");
    console.log(fileName);

    //data to be stored in file
    let data = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}-${date.getHours() >= 12 ? "PM" : "AM" }`;
       
//to write the file
    fs.writeFileSync(`./TimeFiles/${fileName}.txt`, data, (err) => {
        if (err) {
            console.log(err);
        }
    });
    res.send("file created successfully");
});

//to get the data from file
app.get("/getFile",(req,res)=>{
    let storage = fs.readdirSync("./TimeFiles");
    res.send(storage.sort());
});

app.get("/",(req,res)=>{
    res.send(`use https://filesystem-nodejs-zenclass.herokuapp.com/createFile to create file and https://filesystem-nodejs-zenclass.herokuapp.com/getFile to get file`);
});

app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
})


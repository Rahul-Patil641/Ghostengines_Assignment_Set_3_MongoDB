const express = require('express');
const mongoose = require('mongoose');
//const dotenv = require('dotenv');
const app = express();

mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser: true}).then(()=>{
    console.log("MongoDb Connection successful");
}).catch((err)=>{
    console.log(err);
});

const userSchema = new mongoose.Schema({
    id : {
        type: Number,
        require: true,
        unique: true
    },
    name: {
        type: String,
        require: true,
    },
    age: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    interests:{
        name : {
            type: String
        },
        type:{
            type: String
        }
    },
    skills: []
});

const User = mongoose.model("User",userSchema);
//Creating documents manually to insert into the database
const Rahul = new User({
    id: 1,
    name: "Rahul",
    age: 21,
    email: "rp814132@gmail.com",
    interests: {
        name: "painting",
        type: "art"
    },
    skills: ["Coding","Web development"]
})
const Rohit = new User({
    id: 2,
    name: "Rohit",
    age: 20,
    email: "rohit@gmail.com",
    interests: {
        name: "coding",
        type: "tech"
    },
    skills: ["MongoDB", "MySQL"]
})
const Harshal = new User({
    id: 3,
    name: "Harshal",
    age: 22,
    email: "harshal@gmail.com",
    interests: {
        name: "Chess",
        type: "Game"
    },
    skills: ["Python","Django"]
})
const Abhijeet = new User({
    id: 4,
    name: "Abhijeet",
    age: 21,
    email: "abhijeet@gmail.com",
    interests: {
        name: "History",
        type: "Literature"
    },
    skills: ["Html","CSS"]
})
const Satyajeet = new User({
    id: 5,
    name: "Satyajeet",
    age: 21,
    email: "satya@gmail.com",
    interests: {
        name: "Singing",
        type: "art"
    },
    skills: ["React","Redux"]
});
//Inserting the records
User.insertMany([Rahul,Rohit,Harshal,Abhijeet,Satyajeet], function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Succesfully saved the users");
    }
});

//updating the records using $set

User.update({id:3},{$set:{"name":"Atharva"}},function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Successfuly updated the document");
    }
});

//updating the skills array of a prticular record using $addtoset
User.update({name: "Rohit"}, {$addToSet: {skills: "MongoDB"}},function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Succesfully updated the document");
    }
});
//pushing values into the skills array of a particular record using $push
User.update({name: "Rohit"}, {$push: {skills: "MongoDB"}},function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Succesfully updated the document");
    }
});

//pulling values from the skills array of a particular record using $pull

User.update({id: 5}, {$pull: {skills: "Redux"}},function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Succesfully updated the document");
    }
});


//Displaying all the users using find() method.
User.find(function(err, users){
    if(err){
        console.log(err);
    }else{
        users.forEach(function(user){
            console.log(user);
        })
    }
})


//displaying a particular using findOne() method.
User.findOne({id: 4},function(err, user){
    if(err){
        console.log(err);
    }else{
        console.log(user);
    }
})

//Displaying the users in ascending order of their names using sort() method.
User.find(function(err,users){
    if(err){
        console.log(err);
    }else{
        users.forEach(function(user){
            console.log(user);
        })
    }
}).sort({name:1});

//Displaying the users in ascending order of their ages using sort() method.

User.find(function(err,users){
    if(err){
        console.log(err);
    }else{
        users.forEach(function(user){
            console.log(user);
        })
    }
}).sort({age:1});

//Displaying records using limit() method.
User.find(function(err,users){
    if(err){
        console.log(err);
    }else{
        users.forEach(function(user){
            console.log(user);
        });
    }
}).limit(3);

//Screenshots of output are attached in the document file.


app.listen(3000,function(req,res){
    console.log("Server running on port 3000");
});

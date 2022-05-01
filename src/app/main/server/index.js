const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectId;
   
const app = express();
const jsonParser = express.json();
 
const mongoClient = new MongoClient("mongodb://localhost:27017/");
 
let dbClient;
 
app.use(express.static(__dirname + "/public"));
 
mongoClient.connect(function(err, client){
    if(err) return console.log(err);
    dbClient = client;
    app.locals.collection = client.db("usersdb").collection("users");
    ////////
    const collection = app.locals.collection;
    collection.findOne({login: "sad"}, function(err, user){
               
        if(err) return console.log(err);
        console.log(user.login, " and ", user.password)
        //if (user.password === userPassword) {
        //    console.log(user);
        //}
    });

    ////////
    app.listen(3000, function(){
        console.log("Сервер ожидает подключения...");
    });
});
 
app.get("/api/users", function(req, res){
        
    const collection = req.app.locals.collection;
    collection.find({}).toArray(function(err, users){
         
        if(err) return console.log(err);
        res.send(users)
    });
     
});

app.get("/api/users/:id", function(req, res){
        
    const id = new objectId(req.params.id);
    const collection = req.app.locals.collection;
    collection.findOne({_id: id}, function(err, user){
               
        if(err) return console.log(err);
        res.send(user);
    });
});

app.post("/api/users", jsonParser, function (req, res) {
       
    if(!req.body) return res.sendStatus(400);
       
    const userLogin = req.body.login;
    res.send(userLogin);
    const userPassword = req.body.password;
    const user = {login: userLogin, password: userPassword};
       
    const collection = req.app.locals.collection;
    collection.insertOne(user, function(err, result){
               
        if(err) return console.log(err);
        res.send(user);
    });
});

app.post("/api/users/login", jsonParser, function(req, res){
        
    //const id = new objectId(req.params.id);
    //if(!req.body) return res.sendStatus(400, req.body, "from server");
    //if(!req.body) return res.status(200).send(req.body);
    console.log(req.body, "login");
    if (!req.body) return res.sendStatus(400);
    const userLogin = req.body.login;
    const userPassword = req.body.password;
    const collection = req.app.locals.collection;
    /*collection.findOne({_userLogin: userLogin}, function(err, user){
               
        if(err) return console.log(err);
        if (user.password === userPassword) {
            console.log(user, " is user");
            res.send(user);
        }
    });*/
    collection.findOne({login: userLogin}, function(err, user){
        if(err) return console.log(err);
        //console.log(user.login, " and ", user.password)
        if (user) {
            if (user.password === userPassword) {
                console.log(user, " is user");
                res.send(user);
            } else {
                res.sendStatus(400);
            }
        } else res.sendStatus(400);

    });
});
app.post("/api/users/signup", jsonParser, function(req, res){
    console.log(req.body, "signup");
    if (!req.body) return res.sendStatus(400);
    const userLogin = req.body.login;
    const userPassword = req.body.password;
    const collection = req.app.locals.collection;
    collection.findOne({login: userLogin}, function(err, user){
        //if(err) return res.sendStatus(400);
        console.log(user, "101");
        if (user) {
            res.sendStatus(400);
        } else { 
            let newuser = {login: userLogin, password: userPassword};
            collection.insertOne(newuser, function(err, result){
                if(err) return console.log(err);
                res.send(newuser);
            });
        }

    });
});
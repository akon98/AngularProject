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
    app.locals.collection_prod = client.db("usersdb").collection("product");
    ////////
    const collection = app.locals.collection;
    const collection_prod = app.locals.collection_prod;
    collection.findOne({login: "sad"}, function(err, user){
               
        if(err) return console.log(err);
        console.log(user.login, " and ", user.password)
        //if (user.password === userPassword) {
        //    console.log(user);
        //}
    });
    /*
    products = [
        {name: "РЮКЗАК ADIDAS 4 ATHLTS", price: 6999, url: "/static/product/2.png"},
        {name: "КРОССОВКИ FALCON", price: 5699, url: "/static/product/3.png"},
        {name: "ШОРТЫ ДЛЯ ФИТНЕСА PACER 3-STRIPES WOVEN TWO-IN-ONE", price: 4999, url: "/static/product/4.png"},
        {name: "КРОССОВКИ ДЛЯ БЕГА QT RACER", price: 4999, url: "/static/product/5.png"},
        {name: "ТОЛСТОВКА ESSENTIALS 3-STRIPES", price: 6699, url: "/static/product/6.png"},
    ]
    collection_prod.insertMany(products);*/
    let users = [
        {login: "root", password: "root", isAdmin: true}
    ]
    collection.findOne({login: "root"}, function(err, user){
        if (user) return;
        collection.insertMany(users);
        console.log("root created");
    })
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
app.get("/api/product", function(req, res){
    const collection_prod = req.app.locals.collection_prod;
    collection_prod.find({}).limit(6).toArray(function(err, product){
         
        if(err) return console.log(err);
        res.send(product)
    });
     
});
app.post("/api/product/create", jsonParser, function(req, res){
    console.log(101);
    console.log(req.body, "product create");
    if (!req.body) return res.sendStatus(400);
    console.log(req.body.product.name);
    const productName = req.body.product.name;
    const productPrice = req.body.product.price;
    const productUrl = req.body.product.url;
    const collection_prod = req.app.locals.collection_prod;
    collection_prod.findOne({name: productName}, function(err, product){
        //if(err) return res.sendStatus(400);
        console.log(product, "103");
        if (product) {
            res.sendStatus(400);
        } else { 
            let newproduct = {name: productName, price: productPrice, url: productUrl};
            console.log(newproduct, "102");
            collection_prod.insertOne(newproduct, function(err, result){
                if(err) return console.log("error \n", err);
                res.send(newproduct);
            });
        }

    });
});
path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))

cors = require('cors'),
multer = require('multer'),
bodyParser = require('body-parser');
const PATH = 'D:/ProjectsTS/TrustProj/src/app/main/server/public/product';
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, PATH);
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + ".png")
    }
  });
  let upload = multer({
    storage: storage
  });
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.post('/api/product/upload', upload.single('image'), function (req, res) {
    if (!req.file) {
      console.log("No file is available!");
      return res.send(
        "success: false"
      );
    } else {
      console.log('File is available!');
      return res.send(
        "success: true"
      )
    }
  });
  app.get("/api/product/getfulldb", function(req, res){
    const collection_prod = req.app.locals.collection_prod;
    collection_prod.find({}).toArray(function(err, product){
         
        if(err) return console.log(err);
        res.send(product)
    });
     
});


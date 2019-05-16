
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("config");
const winston = require("winston");
const Joi = require('joi');
var jwt = require('jsonwebtoken');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors({
    origin: "http://localhost:4200"
}));

const logConfiguration = {
    'transports': [
        new winston.transports.File({
            filename: './log/logfile.log'
        })
    ]
};

const logger = winston.createLogger(logConfiguration);

const db_conn = config.get("db.conn_str");
mongoose.connect(db_conn, { useNewUrlParser: true })
    .then(() => {
        logger.info("Database connected!!!");        
    })
    .catch((ex) => {        
        logger.error(ex.message);
    });

app.listen(3000, () => {
    logger.info("server running @ localhost:3000");
});

const userSchema = mongoose.Schema({
    "username": String,
    "password": String,
    "firstname": String,
    "lastname": String,
    "phone": Number,
    "gender": String
});

const uschema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    phone: Joi.number().required(),
    gender: Joi.string().required()
});

const postSchema = mongoose.Schema({
    "postTitle": String,
    "postBody": String,
    "Createdby": String,
    "Counter": {
        type: Number,
        default: 0
    }
});

const pschema = Joi.object().keys({
    postTitle: Joi.string().required(),
    postBody: Joi.string().required(),
    Createdby: Joi.string().required(),
    Counter: Joi.number()
});

const commentSchema = mongoose.Schema({
    "postId": String,
    "commentBody": String,
    "Createdby": String
});

const LikedPostDataSchema = mongoose.Schema({
    "postId": String,
    "LikedBy": String
});

const cschema = Joi.object().keys({
    postId: Joi.string().required(),
    commentBody: Joi.string().required(),
    Createdby: Joi.string().required()
});

const userModel = mongoose.model("users", userSchema);
const postModel = mongoose.model("posts", postSchema);
const commentModel = mongoose.model("comments", commentSchema);
const LikedPostDataModel = mongoose.model("likedpostdata", LikedPostDataSchema);

app.post("/createUser", async (req, res) => {
    try {
        const resvalidation = Joi.validate(req.body, uschema);
        if (resvalidation.error) {
            console.log("error in saving user");
        }
        else {
            const user_doc = userModel(req.body);
            const result = await user_doc.save();
            res.status(200).send(result);
        }
    }
    catch (ex) {
        res.status(403).send(ex.message);
    }
});

app.post("/IsUserAvailable", (req, res) => {
    userModel.find({ username: req.body.username, password: req.body.password })
        .then((data) => {
            if (data === undefined || data.length == 0) {
                res.status(200).send({ "errorMsg": "User not exist" });
            } else {
                const token = jwt.sign(data[0].username, "marlabsSecretKeysgdj7556j8shdgg");
                res.json({
                    status: 200,
                    data: "User exists",
                    token: token
                });
            }
        })
        .catch((ex) => {
            res.status(403).send(ex.message);
        })
});

// Middleware
app.use(function (req, res, next) {
    const mysavedtoken = req.headers.token;
    // logger.info("My token is");
    // logger.info(mysavedtoken);

    if (mysavedtoken == undefined) {
        logger.error("token not found");
        //res.redirect("/");  
        //res.sendFile(__dirname + "/public/views/login.html");      
    }
    else {
        jwt.verify(mysavedtoken, 'marlabsSecretKeysgdj7556j8shdgg', (err, decoded) => {
            if (err) {
                res.send("invalid token");
            }
            else {
                req.decoded = decoded;
                next();
            }
        });
    }
});

app.post("/createPost", async (req, res) => {
    req.body.Createdby = req.decoded;
    try {
        const resvalidation = Joi.validate(req.body, pschema);
        if (resvalidation.error) {
            console.log("error in saving post");
            console.log(resvalidation.error);
        }
        else {
            const post_doc = postModel(req.body);
            const result = await post_doc.save();
            res.status(200).send(result);
        }
    }
    catch (ex) {
        res.status(403).send(ex.message);
    }
});

app.get("/getPosts", (req, res) => {
    postModel.find({})
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((ex) => {
            res.status(403).send(ex.message);
        })
});

app.post("/updatePost", (req, res) => {
    postModel.findByIdAndUpdate({ _id: req.body.pid }, req.body, { new: true }, function (err, response) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).send(response);
        }
    })
});

app.post("/getPostbyId", (req, res) => {    
    postModel.find({ _id: req.body.pid })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((ex) => {
            res.status(403).send(ex.message);
        })
});

app.post("/deletePost", (req, res) => {
    postModel.deleteOne({ _id: req.body.pid }, function (err) {
        if (err) return handleError(err);
    })
});

app.post("/SaveComment", async (req, res) => {
    req.body.Createdby = req.decoded;
    try {
        const resvalidation = Joi.validate(req.body, cschema);
        if (resvalidation.error) {
            console.log("error in saving comment");
            console.log(resvalidation.error);
        }
        else {
            const comment_doc = commentModel(req.body);
            const result = await comment_doc.save();
            res.status(200).send(result);
        }
    }
    catch (ex) {
        res.status(403).send(ex.message);
    }
});

app.post("/getCommentsbyId", (req, res) => {
    commentModel.find({ postId: req.body.pid })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((ex) => {
            res.status(403).send(ex.message);
        })
});

app.post("/SaveLikedPostData", async (req, res) => {
    try {
        req.body.LikedBy = req.decoded;        
        const LikedPostData_doc = LikedPostDataModel(req.body);
        const result = await LikedPostData_doc.save();
        res.status(200).send(result);
    }
    catch (ex) {
        res.status(403).send(ex.message);
    }
});

app.post("/getListofAllUserLikedPost", (req, res) => {
    LikedPostDataModel.distinct('LikedBy', { postId: req.body.pid })
        .then((data) => {            
            res.status(200).send(data);
        })
        .catch((ex) => {
            res.status(403).send(ex.message);
        })
});

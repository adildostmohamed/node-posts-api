var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// ================================
// APP CONFIG
// ================================

// Set up bodyParser to parse contents from requests and set it on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// ================================
// DATABASE SET UP
// ================================

//Declare environment url for db or local version
var DB_URL = process.env.DATABASE_URL || 'mongodb://localhost/posts_api';

//Connect db to mongoose
mongoose.connect(DB_URL);

//Import Post model
var Post = require('./models/post');

// ================================
// ROUTER SET UP
// ================================

//Declare instance of express router
var router = express.Router();

// INDEX route - GET
router.get('/posts', function(req, res) {
  Post.find({}, function(err, allPosts){
    if(err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(allPosts);
    }
  });
});

// CREATE route - POST
router.post('/posts', function(req, res) {
  var newPost = req.body;
  Post.create(newPost, function(err, newPost){
    if(err) {
      res.status(500).json(err);
    } else {
      res.status(201).json(newPost);
    }
  });
});

// SHOW route - GET
router.get('/posts/:id', function(req, res) {
  var id = req.params.id;
  Post.findById({_id: id}, function(err, foundPost){
    if(err) {
      res.status(404).json(err);
    } else {
      res.status(200).json(foundPost);
    }
  });
});

// UPDATE route - PUT
router.put('/posts/:id', function(req, res) {
  var id = req.params.id;
  var updatedPost = req.body;
  Post.findByIdAndUpdate(id, updatedPost, function(err, updatedPost){
    if(err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(updatedPost);
    }
  });
});

// DELETE route - DELETE
router.delete('/posts/:id', function(req, res) {
  var id = req.params.id;
  Post.findByIdAndRemove(id, function(err, deletedPost){
    if(err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({'status': 'Post deleted successfully'});
    }
  })
});

//ABOUT route
router.get('/about', function(req, res) {
  res.send("This is a simple api to allow for basic CRUD actions for posts and implemented to follow restful principles");
});

//Set root path for router routes to be based on
app.use('/api', router);

// =================================
// SERVER SETUP
// =================================

//Declare port for environment or default to 8080
var port = process.env.PORT || 8080;
//Start server
app.listen(port);
console.log("Server started on port " + port);

 "use strict";

var multer = require("multer");
 var express = require("express");
 var router = express.Router();
 module.exports = router;

 var multerMiddleware = multer({"dest":"/tmp"});

 var userController = require('./../controllers/user.controllers');

  router.get('/content')
    .get(userController.list) //liste des metadonnées de contenu de slides, voir avec Loïc
    
    router.post("/content",multerMiddleware.single("file"), function(request,response){
console.log(request.file.path);
console.log(request.file.originalname);
console.log(request.file.mimetype);
    }); //crée un nouveau contenu à partir du formulaire d'ajout de contenu

  router.route('/content/:contentId')
    .get(userController.read)
    .put(userController.update)
    .delete(userController.delete);

  router.param('contentId', function(req, res, next, id) {
  	req.userId = id;
  	next();
  });

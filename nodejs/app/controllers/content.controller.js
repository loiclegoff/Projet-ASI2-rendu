//content.controller.js

const uuidv1 = require('uuid/v1');
var contentModel = require("./../models/content.model.js");
var CONFIG = require("./../../config.json");
process.env.CONFIG = JSON.stringify(CONFIG);
var path = require("path");
var fs = require("fs");

// LIST
this.list = function(request, response) {
    var dirpath = CONFIG.contentDirectory;
    fs.readdir(CONFIG.contentDirectory, function(err, files) {
        if (err) {
            console.error(response.statut(500).end);
            return response.statut(500).end;
        }
        var filteredFiles;
        files.filter(function(file) {
            filteredFiles = files.filter(extension);
        });

        var content_list = {};
        var i = 0;
        filteredFiles.forEach(function(file) {

            var cfile = require(path.join(dirpath, file));

            contentModel.read(cfile.id, function(err, content) {
                if (err) {

                    console.error(err.message);
                    return response.status(500).end(err.message);
                } else {

                    console.dir(content.getData());

                    content_list[content.id] = content;
                    if (i == filteredFiles.length - 1) {
                        return response.json(content_list);
                    }
                    i++;
                }
            });

        });
    });

}

function extension(element) {
    var extName = path.extname(element);
    return extName === '.json';
};

// CREATE
this.create = function(request, response) {
    var title = request.body.title;
    var type = request.body.type;
    var fileName;
    if (type === "img"){
        var originalfilename = request.file.originalname;
        var ext = path.extname(originalfilename).substr(1);
        var tmp_path = request.file.path;
        var target_path = path.join(CONFIG.contentDirectory, originalfilename);
        fs.readFile(tmp_path, 'utf8', function(err, data) {
            if (err) {
                console.error(response.status(500).end);
                return response.status(500).end;
            }

            var file_content = new contentModel();
            file_content.id = uuidv1();
            file_content.type = type;
            file_content.title = title;
            file_content.fileName = file_content.id + '.' + ext;
            file_content.src = "/contents/" + file_content.id;
            file_content.setData(data);
            fileName = file_content.fileName;
            contentModel.create(file_content, function(err){
               if (err) 
                {
                throw err;
                } 
            });

        });

    } 
    else {
        var src = request.body.src;
        var file_content = new contentModel();
        var ext = path.extname(src).substr(1);
        console.log("ext")
        file_content.id = uuidv1();
        file_content.type = type;
        file_content.title = title;
        file_content.src = src;
        file_content.fileName = file_content.id +"."+ ext;
        contentModel.create(file_content, function(err){
           if (err) 
            {
            throw err;
            } 

        });

    }    
    response.send(request.files);

}
    
// READ
this.read = function(request, response) {

    var params = request.url.split("/");
    var id = params[2];
    var json = '';
    contentModel.read(id,function(err,content){
        if (err) 
        {
        console.error(response.status(500).end);
        return response.status(500).end;
        }
        else{
            console.log(params[3]);
            if (params[3]){ 
                json = params[3];

                if (json == "json=true") {
                    response.send(JSON.stringify(content));
                }
            }

            else {
                if (content.type === "img") {
                    console.log(content.src);
                    response.send(content.src);   
                }
                else {
                    console.log(content.src);
                    var path = content.src;
                    response.redirect(path); 
                }
            
            }

        }
    
    });
    

}
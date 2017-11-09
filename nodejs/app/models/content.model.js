"use strict";


var fs = require("fs");
var path = require("path");
var CONFIG = require("../../config.json");
process.env.CONFIG = JSON.stringify(CONFIG);


var contentModel = function(contmod) {

    this.type = contmod.type;
    this.id = contmod.id;
    this.title = contmod.title;
    this.fileName = contmod.fileName;
    this.src = contmod.src;
    var data = contmod.data;

    this.getData = function() {
        return data;
    }

    this.setData = function(data2) {
        if (data2 === "undefined") { return -1; }
        data = data2;
    }

}

//méthodes

contentModel.create = function(content, callback) {
    
    console.log('create new file');
    if (content.type === "img")
    {
        fs.writeFile(path.join(CONFIG.contentDirectory, content.fileName), content.getData(), function(err) {
            if (err) {
                console.log(err.message);
                return callback(err);
            }
            fs.writeFile(path.join(CONFIG.contentDirectory, content.id + ".meta.json"), JSON.stringify(content), function(err) {
                if (err) {
                    console.log(err.message);
                    return callback(err);
                }
                console.log('CREATED ' + content.id);
                return callback();
            });
        });
    }
    else {
        fs.writeFile(path.join(CONFIG.contentDirectory, content.id + ".meta.json"), JSON.stringify(content), function(err) {
            if (err) {
                console.log(err.message);
                return callback(err);
            }
            console.log('CREATED ' + content.id);
            return callback();
        });
    }

};


//stocke le contenu de [content.data] dans le fichier [content.fileName]
// et les méta dnnées dans [contentModel.id].meta.json dans le répertoire [CONFIG.contentDirectory]

contentModel.read = function(id, callback) {

    console.log("paramètre id :", id);
    fs.readFile(path.join(CONFIG.contentDirectory, id + ".meta.json"), 'utf8', function(err, data) {
        if (err) {
            console.log(err.message);
            return callback(err);
        }

        var objet = JSON.parse(data);
        var content = new contentModel(objet);
        callback(null, content);
    });
};

contentModel.update = function(content, callback) {

fs.writeFile(path.join(CONFIG.contentDirectory, content.fileName), content.getData(), function(err) {

        if (err) {
            console.log(err.message);
            return callback(err);
        }

        fs.writeFile(path.join(CONFIG.contentDirectory, content.id + ".meta.json"), JSON.stringify(content), function(err) {
            if (err) {
                console.log(err.message);
                return callback(err);
            }
            console.log('UPDATED ' + content.id);
            console.log('file updated successfully');
            callback();
        });
    });
};



contentModel.delete = function(id, callback) {


    fs.readFile(path.join(CONFIG.contentDirectory, id + ".meta.json"), 'utf8', function(err, data) {
        if (err) {
            console.log(err.message);
            return callback(err);
        }
        var obj = JSON.parse(data);
        console.log(obj);
        var filename = obj["fileName"];
        fs.unlink(path.join(CONFIG.contentDirectory, filename), function(err) {
            if (err) {
                console.log(err.message);
                return callback(err);
            }
            fs.unlink(path.join(CONFIG.contentDirectory, id + ".meta.json"), function(err) {
                if (err) {
                    console.log(err.message);
                    return callback(err);
                }
                console.log('file deleted successfully');
                callback();
            });
        });

    });

};

module.exports = contentModel;
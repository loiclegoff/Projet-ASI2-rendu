"use strict";

console.log('It works!')

//initialisation d'express

var express = require("express");

var app = express();

//initialisation serveur

var http = require("http");
var CONFIG = require("./config.json");

var server = http.createServer(app);
server.listen(CONFIG.port);

//config accessible par tous les modules

var CONFIG = require("./config.json");
process.env.CONFIG = JSON.stringify(CONFIG);

//on importe la nouvelle route
var defaultRoute = require("./app/routes/default.route.js");
app.use(defaultRoute);

//création de route statique pour pages admin et watch

var path = require("path");

app.use("/admin", express.static(path.join(__dirname,"public/admin")));
app.use("/watch", express.static(path.join(__dirname,"public/watch")));



app.get("/", function(request, response) {
	response.send("It works !");
});


app.use(function(request, response, cb) {
	response.send("It works !");
	cb();
})

//service loadpres

app.get("/loadPres", function(request, response)
{

 	var map = {};	
fs.readdir(CONFIG.presentationDirectory, function(err, data) {
		if (err) {
			console.error(err);
			return response.status(500).end(err.message); 
		}

		var nombrePres = 0;
		var ListePres = []; 

		for(var i = 0; i < data.length;i++){
			if (path.extname(data[i]) == ".json") {
				nombrePres += 1;
				listePres.push(data[i]); //On push la donnée dans la liste
			}}
			console.log(listePres);
			console.log("Nombre de présentations : " +nombrePres);

		var counter = 0;

		listePres.forEach(function(fileName) { //on parcourt la liste ainsi créée
			console.log(fileName)
			fs.readFile(CONFIG.presentationDirectory+"/"+fileName, function (err, dataFile) {
			    if (err) {
			        return console.log(err);
			    }
			    var jsonObject = JSON.parse(dataFile); //on crée l'objet json 
			    map[jsonObject.id] = jsonObject;
			    counter += 1

			    if(counter == nombrePres){ //lorsqu'on a parcouru toutes les itérations, on arrête
			    	console.log(map);
			    	response.write(map);
			    	response.end;
			    }})})

		})
})

//service savePres
app.post("/savePres", function(request, response) {

	request.on('data', function(chunk) {
		var jsonObject = JSON.parse(chunk);
		console.log(CONFIG.presentationDirectory+"/"+jsonObject.id+".pres.json");

		fs.writeFile(CONFIG.presentationDirectory+"/"+jsonObject.id+".pres.json", JSON.stringify(jsonObject), 'utf8', function (err) {
		    if (err) {
		        return console.log(err);
		    }
		    console.log("The file was saved!");
		    response.write("The file was saved!");
		    response.end;
		}); 
	 })

});

var contentRouter = require("./app/routes/content.router.js");
app.use(contentRouter);


"use strict";

var path = require("path");
var fs = require("fs");
var ContentModel = require("../models/content.model.js");
var CONFIG = require("./../../config.json");
process.env.CONFIG = JSON.stringify(CONFIG);


function IoController(){

}

IoController.listen= function(httpServer){
    var currPresId;
    var numSlide;
    var socketMap = new Map();
    // IO server connection
    if(!httpServer)
    	return;
    var io = require('socket.io')(httpServer);
    io.on('connection',function(socket){

        socket.emit("connection");

        socket.on("data_comm", function(id){
        	socketMap[id] = socket;

        });
        socket.on("slidEvent", function(event){
            if(event.CMD!=undefined && event.CMD!="PAUSE")
            {
                if(event.CMD=="START")
                {
                    currPresId=event.PRES_ID;
                    numSlide=0;
                }
                if(currPresId!=null && currPresId!=undefined)
                {
                    fs.readFile(CONFIG.presentationDirectory+"/"+currPresId+".pres.json",function(err,data)
                    {
                        if(!!err)
                        {   
                            console.error(err);
                            return;
                        }
                        var parsed = JSON.parse(data);
                        if(parsed.slidArray.length>=1){
                            switch(event.CMD){
                                case "START":
                                numSlide=0;
                                break;
                                case "BEGIN":
                                numSlide=0;
                                break;
                                case "END":
                                numSlide=parsed.slidArray.length-1;
                                break;
                                case "NEXT":
                                if(numSlide<parsed.slidArray.length-1)
                                numSlide=numSlide+1;
                                break;
                                case "PREV":
                                if(numSlide>0)
                                numSlide=numSlide-1;
                                break;
                            }
                            var currSlideId= parsed.slidArray[numSlide].id;
                            ContentModel.read(currSlideId, function (err, content) {
                                if(!!err)
                                    {
                                        console.error(err);
                                        return err;
                                    }
                                content.src = "/contents/" + content.id;
                                for (var i in socketMap){
                                    socketMap[i].emit('currentSlidEvent',content);
                                }
                            });
                        }
                                   
                   
                    });
                }
            }
            
        });

    });
httpServer.listen(3000);
}
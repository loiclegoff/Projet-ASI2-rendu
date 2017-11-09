'use strict';

var CONFIG = require("./config.json");
process.env.CONFIG = JSON.stringify(CONFIG);

var utils = require("./app/utils/utils.js");
var ContentModel = require("./app/models/content.model.js");

var content = new ContentModel();

content.id = utils.generateUUID();
content.type = "myType";
content.title = "myTitle";
content.fileName = content.id + ".txt";
content.setData("It Works !");

console.log("---------- ContentModel ----------");
console.dir(ContentModel);
console.log("-------------------------------");
console.log("------------ content -------------");
console.dir(content);
console.log("-------------------------------");

function test1(content) {
	console.log("====== TEST 1 =======");

	return new Promise((resolve, reject) => {
		ContentModel.create(content, function(err) {
			if (err) {
				console.error(err);
				reject(err);
			} else {
				resolve(content);
			}
		});
	});
}

function test2(content) {
	console.log("====== TEST 2 =======");

	return new Promise((resolve, reject) => {
		ContentModel.read(content.id, function(err, data) {
			if (err) {
				console.error(err);
				reject(err);
			} else {
				console.log(data);
				resolve(data);
			}
		});
	});
}

function test3(content) {
	console.log("====== TEST 3 =======");
	content.title = "MOD_title";
	content.setData(content.getData() + " YES,  IT IS !!!");

	return new Promise((resolve, reject) => {
		ContentModel.update(content, function(err) {
			if (err) {
				console.error(err);
				reject(err);
			} else {
				console.dir(content);
				resolve(content);
			}
		});
	});
}

function test4(content) {
	console.log("====== TEST 4 =======");


	return new Promise((resolve, reject) => {
		ContentModel.delete(content.id, function(err) {
			if (err) {
				console.error(err);
				reject(err);
			} else {
				console.dir("Slid supprimee");
				resolve();
			}
		});
	});

}

function testErr(content) {
	console.log("====== TEST ERROR =======");
	var contentTest = new ContentModel(12);
	console.dir(contentTest);

	return test1(12)
		.then(console.log, function(err) {
			logError(err);

			content.id = null;
			return content;
		})
		.then(test1)
		.then(console.log, function(err) {
			logError(err);
			return content;
		})
		.then(test2)
		.then(console.log, function(err) {
			logError(err);
			return content;
		})
		.then(test3)
		.then(console.log, function(err) {
			logError(err);
			content.id = 12;
			return content;
		})
		.then(test3)
		.then(console.log, function(err) {
			logError(err);
			return content;
		});
}

function logError(err) {
	console.error(">>> ERROR");
	console.error(err);
	console.error("<<< ERROR");
}

(function() {
	test1(content)
		.then(test2)
		.then(test3)
		.then(test4)
		.then(function() {
			console.log("========== TESTS PHASE 1 : OK ==========");
			return content;
		}, function() {
			return Promise.reject(new Error("========== TESTS PHASE 1 : KO =========="));
		})
		.then(testErr)
		.then(function() {
			console.log("========== TESTS PHASE 2 : OK ==========");
		}, function(err) {
			return Promise.reject((!!err) ? err : new Error("========== TESTS PHASE 2 : KO =========="));
		})
		.then(function() {
			console.log("========== FIN TESTS ==========");
		}, function(err) {
			console.log(err.message);
		});
})();
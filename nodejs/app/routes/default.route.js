"use strict";

// default.route.js
var express = require("express");
var router = express.Router();
module.exports = router;

// Routing using

router.route("/")
	.get(function(req, res) {
		res.end("Hello world !");
	});
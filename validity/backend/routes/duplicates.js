var express = require("express");
var router = express.Router();
const DuplicateFinder = require('../models/duplicatefinder');



router.post("/", function(req, res, next) {
    
    console.log(req.body);
    const finder = new DuplicateFinder(req.body);
    if(finder.validate()){
        const returndata = finder.checkDuplicates(1, 2);
		console.log(returndata);
	    res.json(returndata);
    } else {
        res.status(400).json("Invalid request, csv data was invalid.");
    }
});

module.exports = router;

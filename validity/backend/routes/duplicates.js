var express = require("express");
var router = express.Router();
const DuplicateFinder = require('../models/duplicatefinder');

router.post("/", function(req, res, next) {
    const finder = new DuplicateFinder(req.body.data);
    if(finder.validate()){
        console.log(req.body)
        const returndata = finder.checkDuplicates(req.body.minMatches, req.body.maxDistance, req.body.ignoreColumns);
	    res.json(returndata);
    } else {
        res.status(400).json("Invalid request, check your csv data and request format.");
    }
});

module.exports = router;

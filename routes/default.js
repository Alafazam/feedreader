var express = require('express');
var router = express.Router();
var feed = require("../feedReadModified");
var request = require('request');
var parseString = require('xml2js').parseString;
var superagent = require('superagent');


router.get('/', function(req, res) {
    res.render('index');
});


router.get('/readFeed', (req, res) => {
    let feed_url = req.query.q;
    request(feed_url,function(err, respo, body) {
        if(err || typeof respo == undefined ||(respo.statusCode != 200)) return res.send({err: "server responded with statusCode " + respo.statusCode})

        parseString(body, (err, result) => {
            res.json({data:result});
        });
    });
});

module.exports = router;

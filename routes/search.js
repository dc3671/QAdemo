var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/search', function(req, res, next) {
    var question = req.query.question;
    var response = [];
    var max_score = 0,
        best_al = -1,
        al = ['quiz', 'forum', 'keyword'];

    for (var i = 0; i < 3; i++) {
        var url = util.format("http://10.9.10.15:9201/tsinghuax_v2/%s/_search?q=question:%s", intf[i], question);
        console.log(url);

        request.get(url, function(err, res, body) {
            console.log(body);
        })
    }
});

module.exports = router;

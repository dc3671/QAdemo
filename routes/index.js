var express = require('express');
var router = express.Router();
var util = require('util');
var async = require('async');
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {});
});

router.post('/search', function(req, res, next) {
    var question = req.body.question;
    //console.log(question);
    var max_score = 0,
        best_al = -1,
        al = ['quiz', 'forum', 'keyword'];
    var url = al.map(el => util.format('http://10.9.10.15:9201/tsinghuax_v2/%s/_search?q=question:%s', el, encodeURI(question)));

    async.map([0, 1, 2], function(index, callback) {
        request(url[index], (err, head, body) => {
            body = JSON.parse(body);
            var temp_result = {};
            if (body.hits.total == 0) {
                temp_result = {
                    'hits': [],
                    'total': 0
                };
            } else {
                if (max_score < body.hits.max_score) {
                    max_score = body.hits.max_score;
                    best_al = index;
                }
                temp_result = {
                    'hits': body.hits.hits.slice(0, 3),
                    'total': Math.min(3, body.hits.total)
                };
            }
            callback(null, temp_result);
        });
    }, function(err, results) {
        var response = [0, 1];
        response = response.map(item => results[item]);
        if (best_al == -1) {
            response.push({
                'hits': [],
                'total': 0
            });
        } else {
            response.push({
                'hits': results[best_al].hits.slice(0, 1),
                'total': 1
            });
        }
        response.push(results[2]);
        res.send(response);
    });
});

router.use('/search_class', function(req, res, next) {
    var question = req.body.question;
    var url = util.format('http://10.9.10.15:7777/wit/?session=jx666&text=%s', encodeURI(question));
    console.log(url);
    request(url, function(err, response, body) {
        body = JSON.parse(body);
        res.send(body);
    })
});

module.exports = router;

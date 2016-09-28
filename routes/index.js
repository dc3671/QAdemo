var express = require('express');
var router = express.Router();
var util = require('util');
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {});
});

router.post('/search', function(req, res, next) {
    var question = req.query.question;
    console.log(req.query);
    var results = [];
    var max_score = 0,
        best_al = -1,
        al = ['quiz', 'forum', 'keyword'];

    al.forEach((curr, index) => {
        var url = util.format('http://10.9.10.15:9201/tsinghuax_v2/%s/_search?q=question:%s', curr, question);
        console.log(url);

        request(url, (err, reshead, body) => {
            // for debug
            body = {
                'hits': {
                    'hits': [{
                        'question': '问题1',
                        'answer': '回答1',
                        'score': 10
                    }, {
                        'question': '问题2',
                        'answer': '回答2',
                        'score': 9
                    }, {
                        'question': '问题3',
                        'answer': '回答3',
                        'score': 8
                    }],
                    'total': 10,
                    'max_score': 10
                }
            };
            // console.log(body);

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
                    'hits': body.hits.hits.slice(0, 2),
                    'total': Math.min(3, body.hits.total)
                };
            }
            results.push(temp_result);
            console.log(results);
            if (results.length == 3) {
                res.send(results);
            }
        });
    });
});

router.use('/search_class', function(req, res, next) {
    var userid = req.query.userid;
    var url = util.format('http://localhost:7777/recommend/%d', userid);
    request(url, function(response, body) {
        body = {
            'courses': [{
                'course_name': '课程1'
            }, {
                'course_name': '课程2'
            }, {
                'course_name': '课程3'
            }]
        };
        res.send(body);
    })
});

module.exports = router;

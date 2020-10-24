var express = require('express');
var router = express.Router();
var Assessment = require('../models/assessment');

router.post('/', function(req, res, next) {
    Assessment.register(new Assessment({ text : req.body.text, user: req.user }), req.body.password, function(err, user) {
        if (err) {
          return res.render('register', { error : err.message });
        }
    });
});  

router.put('/:assessmentId', function(req, res, next) {
    Assessment.findOneAndUpdate(req.params.id, req.body, function(err, doc, assessment) {
        if (err) {
            return res.render('assessment/edit', { assessment, error : err.message });
        }                
    });
});

module.exports = router;
var router = require('express').Router();

router.get('/users', function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});
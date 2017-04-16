var router = require('express').Router();
var User = require('../../../../models/User');
var jwt    = require('jsonwebtoken');

router.post('/', function(req, res) {

    User.findOne({
        name: req.body.name
    }, function(err, user) {
        if (err) {
            throw err;
        }

        if (!user) {
            res.json({ success: false, message: 'Echec, utilisateur non trouvé.' });
        } else if (user) {

            // Check password
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Eche, mot de passe invalide.' });
            } else {
                //Token
                var token = jwt.sign(user, app.get('superSecret'), {
                    expiresInMinutes: 1440
                });

                // Return Token in JSON
                res.json({
                    success: true,
                    message: 'Succès, token transmis',
                    token: token
                });
            }

        }

    });
});
//
// router.use(function(req, res, next) {
//
//     var token = req.body.token || req.query.token || req.headers['x-access-token'];
//
//     if (token) {
//         jwt.verify(token, app.get('superSecret'), function(err, decoded) {
//             if (err) {
//                 return res.json({ success: false, message: 'Failed to authenticate token.' });
//             } else {
//                 // if everything is good, save to request for use in other routes
//                 req.decoded = decoded;
//                 next();
//             }
//         });
//
//     } else {
//
//         // if there is no token
//         // return an error
//         return res.status(403).send({
//             success: false,
//             message: 'No token provided.'
//         });
//
//     }
// });

module.exports = router;

var express = require('express');
var router = express.Router();
var Annonce = require('./../models/annonce');

/* GET annonces listing.
    lister toutes les annonces
*/
router.get('/', async function(req, res, next) {
    Annonce.find({})
            .then((annonces) => {
                res.json(annonces);
            }).catch((error) => {
                res.status(500);
                res.json({
                    error: error,
                    status: 500
                });
            });

    res.render('annonces/index', {
        annonces
    });    
});

/**
 * liste le détail de l'annonce avec l'id 
 */
router.get('/:id', function (req, res, next) {
    
});

/**
 * créer une annonce depuis une formulaire
 * utiliser l'objet req
 */
router.post('/', function (req, res, next) {

})

/**
 * modifier l'annonce avec l'id depuis une formulaire
 */
router.put('/:id',  function (req, res, next) {
    
});

/**
 * suppression de l'annonce avec l'id obtenu depuis req.body.id
 */
router.delete('/', function(req, res, next) {

})

module.exports = router;


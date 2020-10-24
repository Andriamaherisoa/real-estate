
var express = require('express');
var router = express.Router();
var Annonce = require('./../models/annonce');

const connectEnsureLogin = require('connect-ensure-login');
/* GET annonces listing.
    lister toutes les annonces
*/
router.get('/', async function(req, res, next) {
    const annonces = await Annonce.find({ });    
    
    res.render('annonces/index', {
        annonces
    });    
});

/**
 * liste le détail de l'annonce avec l'id 
 */
router.get('/:annonceId', function (req, res, next) {  
    Annonce.findById(req.params.annonceId, function (err, annonce){
        if(err)
            res.redirect('error');        
        res.render('annonces/details', {
            annonce
        });
    });
});

router.get('/create', function(req, res, next){
    res.render('annonces/create', {});
});

/**
 * créer une annonce depuis une formulaire
 * utiliser l'objet req
 */
router.post('/', connectEnsureLogin.ensureLoggedIn(), function (req, res, next) {
    Annonce.create(req.body, function (error, annonce) {
        if (err) 
            res.render('annonces/create', {
                error
            });
        
        res.redirect('annonces/index');
    });
})

/**
 * modifier l'annonce avec l'id depuis une formulaire
 */
router.post('/:annonceId', connectEnsureLogin.ensureLoggedIn(),   function (req, res, next) {
    Annonce.findOneAndUpdate({ id: req.params.annonceId }, req.body,
        function(error, doc, annonce) {
            if(error)
                res.redirect('error');

            res.redirect('annonces/index');
        });
});

/**
 * suppression de l'annonce avec l'id obtenu depuis req.body.id
 */
router.delete('/', connectEnsureLogin.ensureLoggedIn(),  function(req, res, next) {
    Annonce.findByIdAndDelete(req.body.id, function(error, res) {
        if(error)
            res.redirect('error');

        res.redirect('annonces/index');
    })
})

module.exports = router;


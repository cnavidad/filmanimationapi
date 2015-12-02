var mongoose = require('mongoose');  
var Bbva  = mongoose.model('bbva');

//GET - Return all tvshows in the DB
exports.findAll = function(req, res) {  
    Bbva.find(function(err, tvshows) {
    if(err) res.send(500, err.message);

    console.log('GET /bbva')
        res.status(200).jsonp(bbva);
    });
};
var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var bbvaSchema = new Schema({  
    local:    { type: String },
    lthumb:  { type: String },
    visitante:     { type: String },
    vthumb:  { type: String },
    jornada:  { type: String },
    mes:   { type: Number },
    dia:  { type: Number },
    diaNombre:    { type: String },
    hora:  { type: String },
    ref:  { type: String }
});

module.exports = mongoose.model('bbva', bbvaSchema);
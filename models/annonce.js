var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AssessmentSchema = require('./assessment').AssessmentSchema;

var Annonce = new Schema({
    title: String,
    type: String,
    published: Boolean, // Oui ou non
    status: String, // (disponible, loué, vendu),
    description: String,
    price: Number,
    availabilityDate: Date, // Date de disponibilité
    photos: { data: Buffer, contentType: String }, // photos
    region: String,
    address: String,
    assessments: [AssessmentSchema],
}, {
    timestamps: true
});

module.exports = mongoose.model('Annonce', Annonce);
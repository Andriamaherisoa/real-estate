var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AssessmentSchema = new Schema({
    text: String,
    annonceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Annonce'},
    answers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Reponse'
        }
    ]
});

AssessmentSchema.pre('validate', (next) => {    
    this.answers = [];
    next();
}); 

module.exports = mongoose.model('Assessment', AssessmentSchema);
module.exports.AssessmentSchema = AssessmentSchema;
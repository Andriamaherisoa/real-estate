var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnswerSchema = new Schema({
    text: String,
    assessment: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Assessment'
    },    
});

module.exports = mongoose.model('Answer', AnswerSchema);
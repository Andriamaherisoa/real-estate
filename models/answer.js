const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Answer schema declaration
 */
const AnswerSchema = new Schema({
    text: String,
    assessment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assessment'
    },    
});

module.exports = mongoose.model('Answer', AnswerSchema);
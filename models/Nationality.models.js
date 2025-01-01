
const mongoose = require('mongoose');

const Schema = new mongoose.Schema({

    NationalityName:String,
    created_date:{type:Date},
    updated_date:{type:Date}
});
 
module.exports = mongoose.model('Nationality',Schema);
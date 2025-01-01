
const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    ReligionName:String,
    created_date:{type:Date},
    updated_date:{type:Date}
});
module.exports = mongoose.model('Religion',Schema)
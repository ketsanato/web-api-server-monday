
const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    CountryCode:String,
    CountryName:String,
    created_date:{type:Date},
    updated_date:{type:Date}
});
module.exports = mongoose.model('Country',Schema);
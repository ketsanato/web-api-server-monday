
const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    ProviceCode:String,
    ProviceName:String,
    CountryID:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Country' }],
    created_date:{type:Date},
    updated_date:{type:Date}
});
module.exports = mongoose.model('Provice',Schema);
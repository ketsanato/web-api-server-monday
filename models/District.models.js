
const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    DistrictCode:String,
    DistrictName:String,
    ProviceID:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Provice' }],
    created_date:{type:Date},
    updated_date:{type:Date}
});
 
module.exports = mongoose.model('District',Schema);
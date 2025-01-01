
const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    holiday_types_name:String,
    created_date:{type:Date},
    updated_date:{type:Date}
});
 
module.exports = mongoose.model('holiday_types',Schema)
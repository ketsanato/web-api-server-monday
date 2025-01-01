
const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    group_name:String,
    created_date:{type:Date},
    updated_date:{type:Date}
});
 
module.exports = mongoose.model('group',Schema)
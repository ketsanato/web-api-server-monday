
const mongoose = require('mongoose');

const Schema = new mongoose.Schema({

    position_name:String,
    created_date:{type:Date},
    updated_date:{type:Date}
});
 
module.exports = mongoose.model('position',Schema)
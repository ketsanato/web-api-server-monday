
const mongoose = require('mongoose');

const Schema = new mongoose.Schema({

    TitleLaoName:String,
    created_date:{type:Date},
    updated_date:{type:Date}
});
 
module.exports = mongoose.model('TitleLao',Schema)
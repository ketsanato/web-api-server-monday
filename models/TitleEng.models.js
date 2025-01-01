
const mongoose = require('mongoose');

const Schema = new mongoose.Schema({

    TitleEngName:String,
    created_date:{type:Date},
    updated_date:{type:Date}
});
 
module.exports = mongoose.model('TitleEng',Schema)
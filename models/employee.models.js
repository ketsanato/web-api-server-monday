
const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    EmployeeID:String,
    FullNameLao:String,
    FullNameEng:String,
    Facebook:String,
    Email:String,
    HomePhone:String,
    MobilePhone:String,
    Height:Double,
    Weight:Double,
    DateOfBirth:Date,
    NationalityID:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Nationality'}],
    TitleLaoID:[{ type: mongoose.Schema.Types.ObjectId, ref: 'TitleLao'}],
    TitleEngID:[{ type: mongoose.Schema.Types.ObjectId, ref: 'TitleEng'}],
    PlaceOfBirth:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Village'}],
    CurrentAddress:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Village'}],
    
    created_date:{type:Date},
    updated_date:{type:Date}
});
 
module.exports = mongoose.model('Employee',Schema)
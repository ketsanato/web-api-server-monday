
const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    VillageCode:String,
    VillageName:String,
    DistrictID:[{ type: mongoose.Schema.Types.ObjectId, ref: 'District' }],
    created_date:{type:Date},
    updated_date:{type:Date}
});
 
module.exports = mongoose.model('Village',Schema);
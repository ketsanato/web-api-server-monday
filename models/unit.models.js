
const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    unit_name:String,
    department_id:[{ type: mongoose.Schema.Types.ObjectId, ref: ' departments' }],
    created_date:{type:Date},
    updated_date:{type:Date}
});
 
module.exports = mongoose.model('unit',Schema)

const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    department_name:String,
    groups_id:[{ type: mongoose.Schema.Types.ObjectId, ref: 'groups' }],
    created_date:{type:Date},
    updated_date:{type:Date}
});
 
module.exports = mongoose.model('departments',Schema)
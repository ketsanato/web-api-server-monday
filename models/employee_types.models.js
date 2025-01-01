
const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    employee_types_name:String,
    created_date:{type:Date},
    updated_date:{type:Date}
});
module.exports = mongoose.model('employee_types',Schema)
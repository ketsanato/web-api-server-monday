const mongoose = require('mongoose');

const dotenv = require('dotenv').config();

const uri=process.env.URLMONGODB;
const uri1=process.env.URL_DATABASE_ONLINE;
const { Schema } = mongoose;

mongoose.set('strictQuery', false);
exports.conn = mongoose.connect(uri, {
 useNewUrlParser: true,
 useUnifiedTopology: true,
});

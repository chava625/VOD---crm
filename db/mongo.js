const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://chava:cscs2453@cluster0.zzl1c.mongodb.net/vod', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongo connect');
});

module.exports = db;
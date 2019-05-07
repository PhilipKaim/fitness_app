const mongoose = require('mongoose');

Promise.mongoose = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

module.exports = { mongoose };
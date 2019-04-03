require('./config/config');

const express = require('express');
const cors = require('cors');
const passport = require('passport');

const { mongoose } = require('./db/mongoose');
const { User } = require('./models/users');
const { Food } = require('./models/foods');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use(passport.initialize());

require('./services/passport')(passport);
require('./routes/authRoutes')(app);

require('./routes/apiRoutes/user')(app);
require('./routes/apiRoutes/manageFood')(app);
require('./routes/apiRoutes/data')(app);

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

module.exports = { app };
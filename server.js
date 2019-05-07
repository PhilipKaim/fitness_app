require('./config/config');

const express = require('express');
const cors = require('cors');
const passport = require('passport');
// const morgan = require('morgan')

require('./db/mongoose');
require('./models/users')
require('./models/foods')

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

require('./services/passport')(passport);

// ROUTES
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/apiRoutes/user');
const manageFoodRoutes = require('./routes/apiRoutes/manageFood');
const dataRoutes = require('./routes/apiRoutes/data');
const formRoutes = require('./routes/apiRoutes/form');

app.use('/auth', authRoutes)
app.use('/api', userRoutes)
app.use('/api', manageFoodRoutes)
app.use('/api', dataRoutes)
app.use('/api', formRoutes)

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

module.exports = { app };
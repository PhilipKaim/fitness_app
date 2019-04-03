// const axios = require('axios');
const mongoose = require('mongoose');
// const _ = require('lodash');

const Users = mongoose.model('users');

module.exports = app => {
    app.get('/api/getUser/:token', async (req, res) => {
        const token = req.params.token;

        try {
            const user = await Users.find({
                token
            });

            res.send(user);

        } catch (err) {
            console.log(err);
        }
    });
}
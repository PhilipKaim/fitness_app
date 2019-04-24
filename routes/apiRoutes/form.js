// const axios = require('axios');
const mongoose = require('mongoose');
const Users = mongoose.model('users');
// const _ = require('lodash');

// const Form = mongoose.model('form');

module.exports = app => {
    app.post('/api/form/:weight/:goal/:token', async (req, res) => {
        const { weight, goal, token } = req.params;
        
        try {
            await Users.update(
                {token},
                {weight, goal},
                {multi: true});

            res.send('user weight and goal added');

        } catch (err) {
            console.log(err);
        }
    });
}
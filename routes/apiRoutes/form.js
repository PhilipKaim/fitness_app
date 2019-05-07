const mongoose = require('mongoose');
const express = require('express')
const router = express.Router()

const Users = mongoose.model('users');

router.post('/form/:weight/:goal/:token', async (req, res) => {
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

module.exports = router
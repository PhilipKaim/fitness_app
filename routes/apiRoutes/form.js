// const axios = require('axios');
const mongoose = require('mongoose');
// const _ = require('lodash');

// const Form = mongoose.model('form');

module.exports = app => {
    app.post('/api/form/:weight/:goal', (req, res) => {
        const { weight, goal } = req.params;

        console.log(req.params);
        
        res.redirect("/home");

        // try {
        //     // const user = await Users.find({
        //     //     token
        //     // });

        //     // res.send(user);


        // } catch (err) {
        //     console.log(err);
        // }
    });
}
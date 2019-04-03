// const axios = require('axios');
const mongoose = require('mongoose');
// const _ = require('lodash');

const Food = mongoose.model('foods');

module.exports = app => {
    // gets all nutrition data in the database from selected date range
    app.get('/api/getNutrition/:startDate/:endDate/:token', async (req, res) => {
        let {
            startDate,
            endDate,
            token
        } = req.params;

        try {
            let nutrition = await Food.find({
                dateAdded: {
                    $gte: startDate,
                    $lte: endDate
                },
                token: token
            });

            res.send(nutrition);
        } catch (e) {
            console.log(e);
        }
    });
}
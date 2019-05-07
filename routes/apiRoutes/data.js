const mongoose = require('mongoose');
const express = require('express')
const router = express.Router()

const Food = mongoose.model('foods');

// gets all nutrition data in the database from selected date range
router.get('/getNutrition/:startDate/:endDate/:token', async (req, res) => {
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

module.exports = router

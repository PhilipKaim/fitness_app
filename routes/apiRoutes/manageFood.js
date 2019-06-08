const axios = require('axios');
const mongoose = require('mongoose');
const _ = require('lodash');
const express = require('express')
const router = express.Router()

const Food = mongoose.model('foods');


router.get('/getFood/:search', async (req, res) => {
    let search = req.params.search;

    try {
        let url = `https://trackapi.nutritionix.com/v2/search/instant?query=${search}`;

        let food = await axios.get(url, {
            headers: {
                "x-app-id": process.env.NUTRITION_APP_ID,
                "x-app-key": process.env.NUTRITION_APP_KEY
            }
        });

        res.send(food.data.common);

    } catch (e) {
        console.log(e);
    }

});

router.get('/datePicker/:date/:token', async (req, res) => {
    let date = req.params.date;
    let token = req.params.token;

    console.log(date);
    

    try {
        let foodAgg = await Food.aggregate([{
                $match: {
                    'dateAdded': date,
                    'token': token
                }
            },
            {
                $group: {
                    _id: "$foodName",
                    quantity: {
                        $sum: "$quantity"
                    },
                    image: {
                        $first: '$image'
                    }
                }
            }
        ]);

        res.send(foodAgg);
    } catch (e) {
        console.log(e);
    }
});

router.get('/editFoods/:formattedDate/:token/:foodName', async (req, res) => {
    const {
        formattedDate,
        token,
        foodName
    } = req.params;

    try {
        let food = await Food.find({
            dateAdded: formattedDate,
            token,
            foodName
        });

        res.send(food);
    } catch (e) {
        console.log(e);
    }
});

router.get('/nutritionInfo/:foodName', async (req, res) => {
    let foodName = req.params.foodName

    try {
        let url = `https://trackapi.nutritionix.com/v2/natural/nutrients`;

        let nutrition = await axios.post(url, {
            query: foodName
        }, {
            headers: {
                "x-app-id": process.env.NUTRITION_APP_ID,
                "x-app-key": process.env.NUTRITION_APP_KEY
            }
        });

        res.send(nutrition.data);

    } catch (e) {
        console.log(e);
    }
});

router.post('/saveFood/:token', async (req, res) => {
    const token = req.params.token;

    let data = req.body;

    let proportionSize =
        data.inputWeight === 0 ?
        data.nutritionixWeight * data.quantitiy :
        (data.inputWeight / data.nutritionixWeight) * data.quantitiy;

    let propertiesToMultiply = _.pick(data,
        ['calories', 'carbs', 'fats', 'protein']);

    let finalKeysAndValuesToAddToDatabase = {};

    for (let prop in propertiesToMultiply) {
        if (data.inputWeight !== 0) {
            finalKeysAndValuesToAddToDatabase[prop] = Math.round(propertiesToMultiply[prop] * proportionSize);
        } else {
            finalKeysAndValuesToAddToDatabase[prop] = Math.round(propertiesToMultiply[prop]);
        }
    }

    const capitalize = (string) => {
        let wordsArray = string.split(' ');
        let capitalizedWordsArray = wordsArray.map(word => _.capitalize(word));
        let capitalized = capitalizedWordsArray.join(' ');
        return capitalized;
    }

    finalKeysAndValuesToAddToDatabase['quantity'] = data.quantitiy;
    finalKeysAndValuesToAddToDatabase['inputWeight'] = data.inputWeight === 0 ? undefined : data.inputWeight;
    finalKeysAndValuesToAddToDatabase['foodName'] = capitalize(data.foodName);
    finalKeysAndValuesToAddToDatabase['image'] = data.image;
    finalKeysAndValuesToAddToDatabase['nutritionixWeight'] = data.nutritionixWeight;
    finalKeysAndValuesToAddToDatabase['dateAdded'] = data.dateAdded;
    finalKeysAndValuesToAddToDatabase['timeAdded'] = data.timeAdded;
    finalKeysAndValuesToAddToDatabase['token'] = token;

    await new Food(finalKeysAndValuesToAddToDatabase).save();

    res.send(`${data.foodName} added!`);
});


router.patch('/editFoods/update/:id/:weight/:foodName', async (req, res) => {
    const {
        id,
        weight,
        foodName
    } = req.params;

    try {
        let url = `https://trackapi.nutritionix.com/v2/natural/nutrients`;

        let nutrition = await axios.post(url, {
            query: foodName
        }, {
            headers: {
                "x-app-id": process.env.NUTRITION_APP_ID,
                "x-app-key": process.env.NUTRITION_APP_KEY
            }
        });

        let {
            nf_calories,
            nf_total_fat,
            nf_protein,
            nf_total_carbohydrate
        } = nutrition.data.foods[0];

        let foodToUpdate = await Food.findById(id);

        let {
            quantity,
            nutritionixWeight
        } = foodToUpdate;

        let ratio = (weight / nutritionixWeight) * quantity;

        let protein = Math.round(ratio * nf_protein);
        let carbs = Math.round(ratio * nf_total_carbohydrate);
        let fats = Math.round(ratio * nf_total_fat);
        let calories = Math.round(ratio * nf_calories);

        await Food.findOneAndUpdate({
            _id: id
        }, {
            inputWeight: weight,
            protein,
            carbs,
            fats,
            calories
        });

        res.send(`${foodName} was updated!`);
    } catch (err) {
        res.send(err);
    }
});

router.delete('/editFoods/delete/:id/:foodName', async (req, res) => {
    const {
        id,
        foodName
    } = req.params;

    try {
        await Food.findByIdAndRemove({
            _id: id
        });
        res.send(`${foodName} was deleted!`)
    } catch (err) {
        res.send(err);
    }
});

module.exports = router
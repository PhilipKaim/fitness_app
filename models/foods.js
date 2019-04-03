const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
  foodName: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  calories: {
    type: Number,
    required: true
  },
  protein: {
    type: Number,
    required: true
  },
  carbs: {
    type: Number,
    required: true
  },
  fats: {
    type: Number,
    required: true
  },
  dateAdded: {
    type: String,
    required: true
  },
  timeAdded: {
    type: String,
    required: true
  },
  quantity: {
    type: Number
  },
  inputWeight: {
    type: Number,
    required: true
  },
  nutritionixWeight: {
    type: Number
  },
  token: {
    type: String,
    required: true
  }
});

const Food = mongoose.model('foods', FoodSchema);

module.exports = { Food }
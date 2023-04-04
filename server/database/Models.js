const dotenv = require('dotenv');
dotenv.config();
const moment = require('moment');
const mongoose = require('mongoose');
////////////////////////////////////////////////////////
const DATABASE = process.env.DB_NAME || 'beastie-booze';
// for dev - uncomment the next line and comment out line 10
 //const dbLocation = `mongodb://localhost:27017/${DATABASE}`;
// for prod
const dbLocation = `${process.env.ATLAS_URL}/${DATABASE}`;
// const dbLocation = process.env.ATLAS_URL;
mongoose
  .connect(dbLocation, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`sucessfully connected! ${DATABASE}`);
  })
  .catch((err) => console.error('Failed to connect to database', err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Adding review schema.
const ReviewSchema = new mongoose.Schema(
  {
    username: String,
    googleId: String,
    review: String,
    drinkId: Number,
  },
  { timestamps: { createdAt: 'created_at' } }
);

const Review = mongoose.model('Review', ReviewSchema);

const UserSchema = new mongoose.Schema({
  googleId: String, // not sure if this will a string or a number, need to check once we can get data from google
  username: String,
  favorites: [],
  creations: [],
});

const DrinkSchema = new mongoose.Schema({
  name: String,
  instructions: String,
  ingredients: {},
  alcoholic: Boolean,
  createdBy: String,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
  //add a createdBy to the drinkSchema to link to Users once created
});

const User = mongoose.model('User', UserSchema);
const Drink = mongoose.model('Drink', DrinkSchema);

const addDrink = async (drink) => {
  const { drinkName: name, instructions, ingredients, alcoholic } = drink;
  const newDrink = new Drink({
    name,
    instructions,
    ingredients,
    alcoholic,
  });
  await newDrink.save();
};

const getDrinks = async () => {
  return await Drink.find({}).exec();
};

module.exports = {
  User,
  Drink,
  addDrink,
  getDrinks,
  Review,
};

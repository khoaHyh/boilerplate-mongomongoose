require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;

/* 1. Install and Set Up Mongoose */
getConnection = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  } catch (error) {
    console.error(`Initial connection error: ${error}`);
  }
}

getConnection();

/* 2. Create a Model */
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model('Person', personSchema);

/* 3. Create and Save a Record of a Model 
  Fixed initial connection to db errors by removing quotes
  from Heroku config vars. In our local .env file we leave
  the quotes but something about Heroku causes errors when
  we surround the MONGO_URI var with quotes.
*/

const createAndSavePerson = (done) => {
  let jane = new Person({ 
    name: "Jane",
    age: 18,
    favoriteFoods: ["Pizza", "Broccoli", "Edamame"]
  });
  jane.save((err, data) => {
    if (err) return console.error(`createAndSavePerson error: ${err}`);
    done(null, data);
  });
};

/* 4. Create Many Records with model.create() */
let arrayOfPeople = [
  { name: "Mark", age: 34, favoriteFoods: ["Ice Cream", "Tofu"] },
  { name: "Foo", age: 21, favoriteFoods: ["Donuts"] },
  { name: "Felicity", age: 25, favoriteFoods: ["Bagels", "Cheeseburgers", "French Fries"] }
]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, doc) => {
    if (err) return console.error(`createManyPeople error: ${err}`);
    done(null, doc);
  });
};

/* 5. Use model.find() to Search Your Database */
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName}, (err, docs) => {
    if (err) return console.error(`findPeopleByName error: ${err}`);
    done(null, docs);
  });
};

/* 6. Use model.findOne() to Return a Single Matching Document from Your Database */
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, doc) => {
    if (err) return console.error(`findOneByFood error: ${err}`);
    done(null, doc);
  });
};

/* 7. Use model.findById() to Search Your Database By _id */
const findPersonById = (personId, done) => {
  Person.findPersonById({ _id: personId }, (err, doc) => {
    if (err) return console.error(`findPersonById error: ${err}`);
    done(null, doc);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;

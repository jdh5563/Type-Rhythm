const mongoose = require('mongoose');

let CarModel = {};

const CarSchema = new mongoose.Schema({
  skin: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
});

CarSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  age: doc.age,
});

CarSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: mongoose.Types.ObjectId(ownerId),
  };

  return CarModel.find(search).select('skin').lean().exec(callback);
};

CarSchema.statics.findExistingCar = ownerId => {
  const search = {
    owner: mongoose.Types.ObjectId(ownerId),
  };

  return CarModel.find(search);
};

CarModel = mongoose.model('Car', CarSchema);

module.exports = CarModel;

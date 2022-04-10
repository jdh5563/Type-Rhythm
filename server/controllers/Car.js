const models = require('../models');
const CarModel = require('../models/Car');

const { Car } = models;
let car;

const carPage = (req, res) => res.render('car');

const makeCar = async (req, res) => {
  const carData = {
    skin: req.body.skin,
    owner: req.session.account._id,
  };

  const existingCarList = await CarModel.findExistingCar(carData.owner);
  const existingCar = existingCarList[existingCarList.length - 1];

  if (!existingCar) {
    car = new Car(carData);
  } else {
    car = new Car(existingCar);
    car.skin = carData.skin;
  }

  await car.save();
  return res.status(201).json({ skin: car.skin });
};

const getCar = async (req, res) => {
  const existingCarList = await CarModel.findExistingCar(req.session.account._id);
  const existingCar = existingCarList[existingCarList.length - 1]._doc;

  return res.json({ existingCar });
};

module.exports = {
  carPage,
  makeCar,
  getCar,
};

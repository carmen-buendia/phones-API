const express = require('express');
const router = express.Router();

const  {phonesModel, manufacturedModel} = require('../database/mongo/index');

//get phones
router.get('/phones', async (req, res) => {
    console.info('get data');
    await phonesModel.find({
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      color: req.body.color,
      price: req.body.price,
      screen: req.body.screen,
      processor: req.body.processor,
      ram: req.body.ram,
      date: req.body.date,
    })
      .populate('Manufactured', 'manufacturedSchema')
      .exec((err, car) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ error: err.message });
        }
        return res.status(200).json(car);
      });
  });

//created phones
router.post("/phones", async (req, res, next) => {
  console.log(req.body);
  phonesModel.find({ id: req.body.id })
    .exec()
    .then((car) => {
      if (car.length >= 1) {
        return res.status(409).json({
          message: "phone already exist",
        });
      } else {
        const phone = new phonesModel({
          _id: new mongoose.Types.ObjectId(),
          id: req.body.id,
          name: req.body.name,
          description: req.body.description,
          color: req.body.color,
          price: req.body.price,
          screen: req.body.screen,
          processor: req.body.processor,
          ram: req.body.ram,
          date: req.body.date,
        });
        phone
          .save()
          .then((result) => {
            console.log(result);
            res.status(201).json({
              message: "Phone created",
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: err,
            });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(422).json({
        error: err,
      });
    });
});

module.exports = router;
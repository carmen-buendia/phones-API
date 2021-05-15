const express = require("express");
const router = express.Router();
const multer = require("multer");
const mongoose = require("mongoose");

const { phonesModel } = require("../database/mongo/index");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}_${file.originalname}`);
//   },
//   fileFilter: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     if (ext !== ".jpg" || ext !== ".png") {
//       return cb(res.status(400).end("only jpg, png are allowed"), false);
//     }
//     cb(null, true);
//   },
// });

// const upload = multer({ storage: storage }).single("file");

// //Products
// router.post("/phones/uploadImage", async (req, res) => {
//   await phonesModel
//   upload(req, res, (err) => {
//     if (err) {
//       return res.json({ success: false, err });
//     }
//     return res.json({
//       success: true,
//       image: req.file.path,
//       fileName: req.file.filename,
//     });
//   });
// });

//created phone product
router.post("/phones", async (req, res) => {
  await phonesModel
    .find({ id: req.body.id })
    .exec()
    .then((phone) => {
      if (phone.length >= 1) {
        return res.status(409).json({
          message: "Phone already exist",
        });
      } else {
        const phone = new phonesModel({
          _id: new mongoose.Types.ObjectId(),
          id: req.body.id,
          name: req.body.name,
          manufactured: req.body.manufactured,
          description: req.body.description,
          color: req.body.color,
          price: req.body.price,
          screen: req.body.screen,
          imageFileName: req.body.imageFileName,
          processor: req.body.processor,
          ram: req.body.ram,
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

//get phone product
router.get("/phones", async (req, res) => {
  const order = req.body.order ? req.body.order : "desc";
  const sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  const limit = req.body.limit ? parseInt(req.body.limit) : 100;
  const skip = parseInt(req.body.limit);

  const findArgs = {};
  const term = req.body.searchTerm;

  for (const key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "name") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  console.log(findArgs);

  if (term) {
    phonesModel
      .find(findArgs)
      .find({ $text: { $search: term } })
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        if (err) return res.status(400).json({ success: false, err });
        res
          .status(200)
          .json({ success: true, products, postSize: products.length });
      });
  } else {
    phonesModel
      .find(findArgs)
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        if (err) return res.status(400).json({ success: false, err });
        res
          .status(200)
          .json({ success: true, products, postSize: products.length });
      });
  }
});

//update phone product
router.put("/phones/update/:_id", async (req, res, next) => {
  await phonesModel.findByIdAndUpdate(
    req.params._id,
    req.body,
    function (err, post) {
      if (err) return next(err);
      res.json(post);
    }
  );
});

//delete phone product
router.delete('/phones/delete/:_id', (req, res, next) => {
  phonesModel.findOneAndDelete(req.params._id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;

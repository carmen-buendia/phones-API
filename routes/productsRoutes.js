const router = require('express').Router();
const productCtrl = require('../controllers/productController');


router.route('/phones')
    .get(productCtrl.getProducts)
    .post( productCtrl.createProduct)


router.route('/phones/:id')
    .delete(productCtrl.deleteProduct)
    .put(productCtrl.updateProduct)



module.exports = router;
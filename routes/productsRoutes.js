const router = require('express').Router();
const productCtrl = require('../controllers/productController');
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/phones')
    .get(productCtrl.getProducts)
    .post(auth, authAdmin, productCtrl.createProduct)


router.route('/phones/:id')
    .delete(auth, authAdmin,productCtrl.deleteProduct)
    .put(auth, authAdmin,productCtrl.updateProduct)



module.exports = router;
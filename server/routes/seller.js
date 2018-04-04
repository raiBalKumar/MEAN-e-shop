const router = require('express').Router();
const Product = require('../models/product');

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = new aws.S3({ accessKeyId: "AKIAJS6L7MBOHX3DG6DA", secretAccessKey: "bFMrjsn2ENoh4BemssFGUE8aH6MUbOOAVyn8XWdj"});

const faker = require('faker');

const checkJWT = require('../middlewares/check-jwt');

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'sulin-shop',
        metadata: function(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function(req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
})

router.route('/products')
        .get(checkJWT, (req, res, next) => {
            Product.find({ owner: req.decoded.user._id})
                    .populate('owner')
                    .populate('category')
                    .exec((err, products) => {
                        if(products) {
                            res.json({
                                success: true,
                                message: "Products",
                                products: products
                            });
                        }
                    });
        })
        .post([checkJWT, upload.single('product_picture')], (req, res, next) => {
            let product = new Product();
            product.owner = req.decoded.user._id;
            product.category = req.body.categoryId;
            product.title = req.body.title;
            product.price = req.body.price;
            product.description = req.body.description;
            product.image = req.file.location;
            product.save();
            res.json({
                success: true,
                message: 'Successfull added the product'
            });
        });

// Just for testing
router.post('/faker/test', (req, res, next) => {
    for(let i=0; i<20; i++){
        let product = new Product();
        product.category = '5ac335658d191c0608c6b3d8';
        product.owner = '5ac33297c4d089058aeb3654';
        product.image = faker.image.cats();
        product.title = faker.commerce.productName();
        product.description = faker.lorem.words();
        product.price = faker.commerce.price();
        product.save();
    }
    res.json({
        message: "Succefully added 20 pictures"
    });
})

module.exports = router;
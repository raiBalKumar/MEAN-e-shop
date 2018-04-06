const router = require('express').Router();
const async = require('async');

const Category = require('../models/category');
const Product = require('../models/product');
const Review = require('../models/review');

const checkJWT = require('../middlewares/check-jwt');

router.route('/products')
        .get((req, res, next) => {
           const perPage = 10;
           const page = req.query.page;
           async.parallel([
               function(callback){
                   Product.count({}, (err, count) => {
                       var totalProducts = count;
                       callback(err, totalProducts);
                   });
               },
               function(callback){
                   Product.find({})
                        .skip(perPage * page)
                        .limit(perPage)
                        .populate('category')
                        .populate('owner')
                        .deepPopulate('reviews.owner')
                        .exec((err, products) => {
                            if(err) return next(err);
                            callback(err, products);
                        });
               }
           ], function(err, results){
               var totalProducts = results[0];
               var products = results[1];

               res.json({
                   success: true,
                   message: 'Products',
                   products: products,
                   totalProducts: totalProducts,
                   pages: Math.ceil(totalProducts / perPage)
               });
           })
        })

router.route('/categories')
        .get((req, res, next) => { 
            Category.find({}, (err, categories) => {
                res.json({
                    success: true,
                    message: "Success",
                    categories: categories
                })
            })
        })
        .post((req, res, next) => {
            let category = new Category();
            category.name = req.body.category;
            category.save();
            res.json({
                success: true,
                message: "Successful"
            });
        });

router.get('/categories/:id', (req, res, next) => {
    const perPage = 10;
    const page = req.query.page;

    async.waterfall([
        function(callback) {
            Product.count({ category: req.params.id },(err,count) => {
                var totalProducts = count;
                callback(err, totalProducts);
            });
        },
        function(totalProducts, callback) {
            Product.find({ category: req.params.id })
                    .skip(perPage * page)
                    .limit(perPage)
                    .populate('category')
                    .populate('owner')
                    .populate('reviews')
                    .exec((err, products) => {
                        if(err) return next(err);
                        callback(err, products, totalProducts);
                    });
        },
        function(products, totalProducts, callback) {
            Category.findOne({_id: req.params.id}, (err, category) => {
                res.json({
                    success: true,
                    message: 'category',
                    products: products,
                    categoryName: category.name,
                    totalProducts: totalProducts,
                    pages: Math.ceil(totalProducts / perPage)
                });
            });

        }
    ]);

    
});

router.get('/product/:id', (req, res, next) => {
    Product.findById({_id: req.params.id})
            .populate('category')
            .populate('owner')
            .deepPopulate('reviews.owner')
            .exec((err, product) => {
                if(err){
                    res.json({
                        success: false,
                        message: 'Product not found'
                    });
                } else {
                    if(product){
                        res.json({
                            success: true,
                            product: product
                        });
                    }
                }
            });
});

router.post('/review', checkJWT, (req, res, next) => {
    async.waterfall([
        function(callback) {
            Product.findOne({_id: req.body.productId}, (err, product)=>{
                if(product){
                    callback(err, product);
                }
            });
        },
        function(product) {
           let review = new Review();
           review.owner = req.decoded.user._id;

           if(req.body.title) review.title = req.body.title;
           if(req.body.description) review.description = req.body.description;
           review.rating = req.body.rating;

           product.reviews.push(review._id);
           product.save();
           review.save();
           res.json({
               success: true,
               message: "Successfull added the review"
           });
        }
    ]);
});

module.exports = router;
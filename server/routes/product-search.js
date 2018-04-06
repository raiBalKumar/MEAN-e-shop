const router = require('express').Router();

const algoliasearch = require('algoliasearch');
const client = algoliasearch('8GI7BZ22IC', '433d4072aea93075e7f7941803fa2613');
const index = client.initIndex('sulin-shop');

router.get('/', (req, res, next)=>{
    if(req.query.query){
        index.search({
            query: req.query.query,
            page: req.query.page
        }, (err, content)=>{
            res.json({
                success: true,
                message: "Here is your search",
                status: 200,
                content: content,
                search_result: req.query.query
            });
        });
    }
});

module.exports = router;
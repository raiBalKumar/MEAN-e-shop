const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');


const config = require('./config');

const app = express();
const port = process.env.PORT || 3030;

mongoose.connect(config.database, (err) => {
    if(err){
        console.log(err);
    }else{
        console.log("Connected to database");
    }
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(morgan('dev'));
app.use(cors());

const userRoutes = require('./routes/account');
const mainRoutes = require('./routes/main');
const sellerRoutes = require('./routes/seller')

app.use('/api', mainRoutes);
app.use('/api/accounts', userRoutes);
app.use('/api/seller', sellerRoutes);

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`);
})
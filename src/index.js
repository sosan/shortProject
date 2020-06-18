const express = require('express'); 
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/shortProject', { useNewUrlParser: true, useUnifiedTopology: true }).then(() =>{
    console.log("CONNECT TO DB");
}).catch((err) => {
    console.log(err);
})

const app = express();

const router = require('./routes/api');
const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, //1min
    max : 20
});

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));
app.use('/api/', apiLimiter);
app.use('/api', router);

app.listen(3000, () => {
    console.log("APP runnning on port 3000");
});
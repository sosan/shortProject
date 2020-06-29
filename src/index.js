const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express'); 
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userAgent = require('express-useragent')
const rateLimit = require('express-rate-limit');

mongoose.connect(configDic.DATABASE_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
    console.log("CONNECT TO DB");
}).catch((err) => {
    console.log(err);
})

const app = express();

const router = require('./routes/api');
const { configDic } = require('./secure/config');
const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, //1min
    max : 20
});

app.use(userAgent.express())
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
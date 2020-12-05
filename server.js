const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const log4js = require('log4js');
const { spawn } = require('child_process');

// custom middlewares/helper fuctions
const  errorHandling =require('./lib/error-handling');
const logging = require('./lib/logger-config');
const MongoDBlib = require('./lib/mongodb_connnect');
const limiter = require('./lib/rate_limitet_conf').limiter


// congig
const STAGE =require('./config/config').stage


const app = express();

// Body parser
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(bodyParser.json({ extended: true, limit: '5mb' }));

// Middleware 
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }));
app.set('trust proxy', 1);


/**Logger config*/
log4js.configure(logging.logerconfig);
const logger = log4js.getLogger('Server.js ');



/**Connet to Mongo DB */

MongoDBlib.connectDB();





//  apply to all requests
app.use(limiter);


stage= STAGE || 'dev'
// Importing routes
app.use(`/${stage}/newsletter`, require('./routes/api/newsletter'));
app.use(`/${stage}/user`, require('./routes/api/user'));



app.use('*', errorHandling.routeNotFound);
app.use(errorHandling.serverError);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
    const eH = spawn('node', ['./services/rabbit_mq_consumer_worker']);

            eH.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
            });

            eH.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
            });

            eH.on('close', (code) => {
            console.log(`eventsHandler process exited with code ${code}`);
            });

});


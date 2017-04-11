import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as compression from 'compression';
import router from './routes';

const app = express();
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(compression());
app.use(morgan('dev'));

app.use(express.static(__dirname + '/assets'));

mongoose.connect('mongodb://localhost/order-system-db', (err) => {
    if (err) console.log('Error connecting to database');
    else console.log('Success in connecting to database');
});

app.use('/api', router);

app.get('*', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`App listening at port: ${port}`);
});
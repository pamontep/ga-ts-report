/**
 *
 * Created by Smarttkow on 4/5/17.
 */
import * as express from 'express';
import * as fs from 'fs';
import {index} from './routes';

const RESOURCE_NOT_FOUND = "RESOURCE_NOT_FOUND";
export let app = express();

//This will render raw HTML, not using a templating engine.
app.engine('html', (filePath, options, callback) => {
    fs.readFile(filePath, (err: any, content) => {
        if (err) {
            return callback(err);
        }

        return callback(null, content.toString());
    })
});

app.set('views', `${__dirname}/public/views`);
app.set('view engine', 'html');
app.set('view options', {layout: false});
app.use(express.static(`${__dirname}/public`));

//Simply logging the incoming transaction
app.use((req, res, next) => {
    console.log(req);
    next();
});

app.use('/', index);
app.use((req, res, next) => {
    next(RESOURCE_NOT_FOUND);
});

//handle errors
app.use((err, req, res, next) => {
    if (err === RESOURCE_NOT_FOUND) {
        res.status(400).header('content-type', 'application/json').send({
            status: 400,
            reason: `${req.path} not found.`
        });
    } else { //print stack trace
        res.status(500).header('content-type', 'text/plain').send(JSON.stringify(err));
    }
});

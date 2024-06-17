import { join } from 'path';
import { connectMongoose } from './mongoose.mjs';
import cors from 'cors';
import express, { json} from 'express';
import { sendEmailRoute } from './routes/userFormPost.mjs';
import { logger } from './logger.js';

const app = express();

app.use(json());
app.use(express.static(join(process.cwd(), 'public')));
app.use('/send-message', sendEmailRoute);


const onListen = () => {
    if (process.env.NODE_ENV !== 'prod') {
        app.use(cors());
        logger('CORS enabled');
        logger(`Listening on http://localhost:${process.env.PORT}`);
    }
    logger('server is up and running 🚀 Connecting to DB...');
    connectMongoose();

}

app.listen(process.env.PORT, onListen);
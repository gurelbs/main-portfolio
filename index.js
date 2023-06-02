import { config } from 'dotenv'
import { join } from 'path';
import { connectMongoose } from './mongoose.mjs';
import cors from 'cors';
import express, { urlencoded,json} from 'express';
import { sendEmailRoute } from './routes/userFormPost.mjs';

const app = express();
const PORT = process.env.PORT || 4000;

config();
connectMongoose();

app.use(urlencoded({ extended: false }));
app.use(cors());
app.use(json());
app.use(express.static(join(process.cwd(), 'public')));
app.use('/send-message', sendEmailRoute);


app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

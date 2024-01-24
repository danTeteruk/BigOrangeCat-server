const express = require('express');
import { askOpenai, handleSpeech } from './controllers/speach';
const cors = require('cors');
require('dotenv').config()

const app = express();
const port = '4000';
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());



app.post('/api/speach', handleSpeech);
app.post('/api/ask-openai', askOpenai);

app.listen(port, () => {})
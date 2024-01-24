import { handleSpeech } from "./controllers/speach";

const express = require('express');

const router = express.Router();

router.post('/add-product', handleSpeech);

export default router;
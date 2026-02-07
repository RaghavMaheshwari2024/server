import express from 'express';
import * as controller from '../controllers/vote.controller.js';

const router = express.Router();

router.post('/', controller.submitVote);

export default router;
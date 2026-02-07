import express from 'express';
import * as controller from '../controllers/voter.controller.js';

const router = express.Router();

// Creating a voter
router.post('/', controller.registerVoter);

export default router;